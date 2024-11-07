import { readFileSync, existsSync } from 'fs';
import { parse, resolve, join } from 'path';
import { hash } from 'bcrypt';
import * as sharp from 'sharp';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, InjectRepository, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Repository, DataSource, DeepPartial, MoreThanOrEqual, Not, IsNull } from 'typeorm';
import { Config } from './config';
import { filterEntities } from '@common/helpers';
import * as se from './entities';
import * as de from '@modules/app-db/entities';
import slugify from 'slugify';

const imageImportLimit = 999;

const sourceEntities = filterEntities(Object.values(se));
const destEntities = filterEntities(Object.values(de));

const imageCache = new Map<string, { buffer: Buffer, mimeType: string }>();

async function getMimeType(image: Buffer) {
  const sharpImage = sharp(image);
  const meta = await sharpImage.metadata();
  return `image/${meta.format}`;
}

async function getImage(path: string) {
  let imageData = imageCache.get(path);
  if (imageData == null) {
    const image = readFileSync(path);
    const mimeType = await getMimeType(image);
    imageData = { buffer: image, mimeType: mimeType };
    imageCache.set(path, imageData);
  }
  return imageData;
}

function findDuplicates<T extends { id: number }, S>(items: T[], keySelector: (item: T) => S, filterBest: (items: T[]) => T) {
  const map = new Map<S, T[]>();
  for (const item of items) {
    const key = keySelector(item);
    let arr = map.get(key);
    if (arr == null) {
      arr = [];
      map.set(key, arr);
    }
    arr.push(item);
  }
  const mappedItems = Array.from(map);
  const remap = new Map<number, T>();
  const filteredItems = mappedItems.map(([key, items]) => {
    const best = filterBest(items);
    for (const item of items) {
      remap.set(item.id, best);
    }
    return best;
  });
  return { items: filteredItems, map: remap };
}

function printProgress(p: number) {
  const totalBarLength = 20;
  process.stdout.cursorTo(0);
  const filledLen = (p / 100) * totalBarLength;
  const progressBar = '█'.repeat(filledLen) + '▒'.repeat(totalBarLength - filledLen);
  process.stdout.write(`image load: [${progressBar}] ${p}%`);
  process.stdout.clearLine(1);
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['./utility/.env.utility'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => ({
        type: 'postgres',
        host: config.get("POSTGRES_HOST"),
        port: parseInt(config.get("POSTGRES_PORT")),
        username: config.get("POSTGRES_USER"),
        password: config.get("POSTGRES_PASSWORD"),
        database: config.get("POSTGRES_DATABASE"),
        entities: destEntities,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: "source",
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => ({
        name: "source",
        type: 'mariadb',
        host: config.get("MARIADB_HOST"),
        port: parseInt(config.get("MARIADB_PORT")),
        username: config.get("MARIADB_USER"),
        password: config.get("MARIADB_PASSWORD"),
        database: config.get("MARIADB_DATABASE"),
        entities: sourceEntities,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(destEntities),
    TypeOrmModule.forFeature(sourceEntities, 'source'),
  ],
})
export class CreateDataModule { }

async function main() {
  const app = await NestFactory.create(CreateDataModule);
  try {
    const sourceDataSource = app.get(getDataSourceToken("source"), { strict: false });
    const destDataSource = app.get(getDataSourceToken("default"), { strict: false });
    const config = app.get(ConfigService);
    const imageDir = config.get("IMAGE_PATH");
    if (!existsSync(imageDir))
      throw new Error(`image dir '${imageDir}' does not exist`);
    const sourceManager = sourceDataSource.manager;
    const artists = await sourceManager.find(se.Artist, { where: { id: MoreThanOrEqual(50) } });
    const images = await sourceManager.find(se.ImageDetail, { relations: { artist: true, image: true }, where: { artistId: MoreThanOrEqual(50) } });
    const artistInfos = findDuplicates(artists.map(a => ({ id: a.id, source: a, user: null, artist: null })), i => i.source.email.toLowerCase(), list => list[0]);
    const filteredImages = findDuplicates(images, i => i.image.filePath.toLowerCase(), list => list.find(i => i.name !== '') || list[0]);
    const manager = destDataSource.manager;
    console.time("total time");
    const countries = await manager.find(de.Country);
    if (countries.length === 0)
      throw new Error(`please run db:create-options first`);
    const importedArtists = await manager.find(de.Artist, { relations: { user: true }, where: { importId: Not(IsNull()) } });
    const importedArtworks = new Set(await manager.find(de.Artwork, { select: { importId: true }, where: { importId: Not(IsNull()) } }).then(list => list.map(a => a.importId)));
    const usedLabels = new Set(await manager.find(de.Artwork, { select: { label: true } }).then(list => list.map(a => a.label)));
    for (const info of artistInfos.items) {
      const email = info.source.email.toLowerCase();
      const match = importedArtists.find(a => a.user.email.toLowerCase() === email);
      if (match != null) {
        info.artist = match;
        info.user = match.user;
        continue;
      }
      info.user = manager.create(de.User, {
        name: info.source.name,
        email: email,
        password: await hash("test", 10),
      });
      const country = countries.find(c => c.name === info.source.country);
      if (country == null)
        throw new Error(`country '${info.artist.country}' does not exist`);
      info.artist = manager.create(de.Artist, {
        importId: info.source.id,
        name: info.source.name,
        biography: info.source.bio,
        country: country,
      });
      info.artist.user = info.user; // preserve reference
    }
    const newArtists = artistInfos.items.filter(i => i.user.id == null);
    console.log("new artists", newArtists.length);
    await manager.transaction(async mgr => {
      await mgr.save(newArtists.map(i => i.user));
      await mgr.save(newArtists.map(i => i.artist));
    });
    let newCount = 0;
    let tasks: Promise<any>[] = [];
    const total = Math.min(imageImportLimit, filteredImages.items.length);
    for (let i = 0; i < total; i++) {
      const image = filteredImages.items[i];
      if (importedArtworks.has(image.id))
        continue;
      let name = (image.name != '') ? image.name : parse(image.image.fileName).name;
      const filePath = resolve(join(imageDir, image.image.filePath.replace('?', '%3F')));
      let slug = slugify(name, { lower: true });
      if (usedLabels.has(slug)) {
        const orig = name;
        for (let j = 2; j < 20; j++) {
          name = `${orig} ${j}`;
          slug = slugify(name, { lower: true });
          if (!usedLabels.has(slug))
            break;
        }
      }
      usedLabels.add(slug);
      const info = artistInfos.map.get(image.artistId);
      const artwork = manager.create(de.Artwork, {
        importId: image.id,
        name: name,
        description: image.style,
        measurements: image.size,
        year: image.year,
        artist: info.artist,
        image: await getImage(filePath),
      });
      tasks.push(manager.save(artwork));
      newCount++;
      const lp = Math.floor(((i - 1) / (total - 1)) * 20);
      const p = Math.floor((i / (total - 1)) * 20);
      if (p > lp) {
        printProgress(p * 5);
        await Promise.all(tasks);
        tasks = [];
      }
    }
    process.stdout.write('\n');
    console.log("new artworks", newCount, `(${total}/${filteredImages.items.length} processed)`);
    console.log("saving...");
    await Promise.all(tasks);
    console.log("done");
    console.timeEnd("total time");
  }
  catch (e) {
    console.error(e);
  }
  finally {
    await app.close();
  }
}

main().catch(e => console.error(e));
