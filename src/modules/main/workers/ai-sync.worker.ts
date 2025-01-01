import { NestFactory } from '@nestjs/core';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppConfigModule, AppConfigService } from '@modules/config';
import { AppDbModule } from '@modules/app-db';
import { HttpApiModule, HttpApiService } from '@modules/http-api';
import { AiRepository } from '@modules/app-db/repositories';
import { Message } from '@modules/messenger';
import { sleep } from '@common/helpers';
import { parentPort } from 'worker_threads';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

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
    HttpApiModule,
  ],
})
export class AiSyncModule { }

const processImageCount = 1;

function getMessageStream() {
  const sub = new Subject<Message>();
  parentPort.on("message", (msg) => {
    sub.next(msg);
  });
  return sub.asObservable();
}

async function run() {
  const logger = new Logger(AiSyncModule.name)
  logger.log("INIT");
  const messages = getMessageStream();
  const app = await NestFactory.create(AiSyncModule);
  const config = app.get(AppConfigService);
  const aiRepository = app.get(AiRepository);
  const httpApi = app.get(HttpApiService);
  const sleepInterval = config.aiAutoProcessInterval * 1000;
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  messages.pipe(filter(msg => msg.type === "ResyncArtworkAiStateMessage")).subscribe(async (msg) => {
    try {
      const artwork = await aiRepository.getArtwork(msg.id);
      if (artwork != null && msg.public) {
        await httpApi.setImagePublic([artwork.image.id]);
      }
    }
    catch (err) {
      logger.error(err, err.stack);
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  messages.pipe(filter(msg => msg.type === "ResyncArtistAiStateMessage")).subscribe(async (msg) => {
    try {
      const artworks = await aiRepository.getArtistArtworks(msg.id);
      const ids = artworks.filter(a => a.public).map(a => a.image.id);
      await httpApi.setImagePublic(ids);
    }
    catch (err) {
      logger.error(err, err.stack);
    }
  });
  while (true) {
    const artworks = await aiRepository.getArtworksForProcessing(processImageCount);
    for (const artwork of artworks) {
      try {
        await httpApi.processImage(artwork);
        await aiRepository.updateArtwork({
          id: artwork.id,
          aiProcessing: true,
        });
        if (artwork.public) {
          await httpApi.setImagePublic([artwork.image.id]);
        }
      }
      catch (ex) {
        logger.error(ex, ex.stack);
      }
    }
    await sleep(sleepInterval);
  }
}

run();
