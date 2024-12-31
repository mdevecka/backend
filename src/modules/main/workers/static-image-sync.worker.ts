import { NestFactory } from '@nestjs/core';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppConfigModule, AppConfigService } from '@modules/config';
import { AppDbModule } from '@modules/app-db';
import { AdminRepository } from '@modules/app-db/repositories';
import { Artwork } from '@modules/app-db/entities';
import { Message } from '@modules/messenger';
import { sleep, getExtensionForMimeType, delayExecution } from '@common/helpers';
import { parentPort } from 'worker_threads';
import { mkdirSync, readdirSync, writeFileSync, rmSync } from 'fs';
import { join, parse } from 'path';
import { Subject } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (appConfig: AppConfigService) => ({
        type: 'postgres',
        host: appConfig.postgresHost,
        port: appConfig.postgresPort,
        username: appConfig.postgresUser,
        password: appConfig.postgresPassword,
        database: appConfig.postgresDatabase,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [AppConfigService],
    }),
    AppDbModule,
  ],
})
export class StaticImageSyncModule { }

const logger = new Logger(StaticImageSyncModule.name)

const sleepInterval = 1000;

function getMessageStream() {
  const sub = new Subject<Message>();
  parentPort.on("message", (msg) => {
    sub.next(msg);
  });
  return sub.asObservable();
}

async function run() {
  logger.log("INIT");
  const messages = getMessageStream();
  const app = await NestFactory.create(StaticImageSyncModule);
  const adminRepository = app.get(AdminRepository);
  const config = app.get(AppConfigService);
  if (config.staticFileRoot == null || config.staticFileRoot === "") {
    logger.warn("missing configuration for STATIC_FILE_ROOT - image sync not available");
    return;
  }
  function removeOldFiles(dir: string, hashSet: Set<string>) {
    mkdirSync(dir, { recursive: true });
    const files = readdirSync(dir);
    const exists = new Set<string>();
    for (const filename of files) {
      const baseName = parse(filename).name;
      if (!hashSet.has(baseName)) {
        rmSync(join(dir, filename));
      } else {
        exists.add(baseName);
      }
    }
    return exists;
  }
  async function imageGetter(artwork: Artwork) {
    let image = await adminRepository.getArtworkProtectedImage(artwork.artist.userId, artwork.id);
    if (image == null) {
      image = await adminRepository.getArtworkImage(artwork.artist.userId, artwork.id);
    }
    return image;
  }
  async function thumbnailGetter(artwork: Artwork) {
    return adminRepository.getArtworkThumbnail(artwork.artist.userId, artwork.id);
  }
  async function storeImage(dir: string, artwork: Artwork, imageGetter: (art: Artwork) => Promise<{ image: Buffer, mimeType: string }>) {
    const image = await imageGetter(artwork);
    if (image == null)
      throw new Error(`missing image for artwork '${artwork.id}'`);
    const ext = getExtensionForMimeType(image.mimeType);
    if (ext == null)
      throw new Error(`missing ext for mime type '${image.mimeType}'`);
    writeFileSync(join(dir, `${artwork.imageHash}.${ext}`), image.image);
  }
  async function syncImages() {
    console.time("sync");
    await adminRepository.updateArtworkImageHashes();
    const artworks = await adminRepository.getArtworkImageHashes();
    const imageDir = join(config.staticFileRoot, "image");
    const thumbnailDir = join(config.staticFileRoot, "thumbnail");
    const hashSet = new Set(artworks.map(a => a.imageHash));
    const existingImages = removeOldFiles(imageDir, hashSet);
    const existingThumbnails = removeOldFiles(thumbnailDir, hashSet);
    for (const artwork of artworks) {
      let wait = false;
      if (!existingImages.has(artwork.imageHash)) {
        storeImage(imageDir, artwork, imageGetter);
        wait = true;
      }
      if (!existingThumbnails.has(artwork.imageHash)) {
        storeImage(thumbnailDir, artwork, thumbnailGetter);
        wait = true;
      }
      if (wait) {
        await sleep(sleepInterval);
      }
    }
    console.timeEnd("sync");
  }
  messages.pipe(startWith<Message>({ type: "ResyncImageMessage" }), filter(msg => msg.type === "ResyncImageMessage"), delayExecution(async () => {
    await syncImages();
  })).subscribe();
}

run();
