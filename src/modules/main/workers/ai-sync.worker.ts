import { NestFactory } from '@nestjs/core';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppConfigModule, AppConfigService } from '@modules/config';
import { AppDbModule } from '@modules/app-db';
import { HttpApiModule, HttpApiService } from '@modules/http-api';
import { AiRepository } from '@modules/app-db/repositories';
import { sleep } from '@common/helpers';

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

const sleepInterval = 30 * 1000;
const processImageCount = 1;

async function run() {
  const logger = new Logger(AiSyncModule.name)
  const app = await NestFactory.create(AiSyncModule);
  const aiRepository = app.get(AiRepository);
  const httpApi = app.get(HttpApiService);
  while (true) {
    const artworks = await aiRepository.getArtworksForProcessing(processImageCount);
    for (const artwork of artworks) {
      try {
        await httpApi.processImage(artwork);
        await aiRepository.updateArtwork({
          id: artwork.id,
          aiProcessing: true,
        });
      }
      catch (ex) {
        if (ex.toJSON != null) {
          logger.error(ex.toJSON());
        } else {
          logger.error(ex, ex.stack);
        }
      }
    }
    await sleep(sleepInterval);
  }
}

run();
