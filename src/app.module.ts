import { Module, NestModule, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { LogRequestMiddleware } from '@common/middleware';
import { MainModule } from '@modules/.';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MintModule } from '@modules/nft-module/mint_trial/mint.module';
import { CollectionModule } from '@modules/nft-module/create_collection/collection.module';
import { NftModule } from '@modules/nft-module/create_nft/nft.module';
import { MetadataModule } from '@modules/nft-module/query_metadata/meta.module';
import { SwapModule } from '@modules/nft-module/change_ownership/swap.module';
import { AppConfigModule, AppConfigService } from '@modules/config';
import { MessengerModule } from '@modules/messenger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
    MessengerModule,
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
        migrationsTableName: "migration",
        migrations: ["dist/src/migrations/*.js"],
        migrationsRun: true,
      }),
      inject: [AppConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [AppConfigModule],
      useFactory: (appConfig: AppConfigService) => ({
        secret: appConfig.aiAccessTokenSecret,
      }),
      inject: [AppConfigService],
    }),
    // todo use Redis as cache provider
    CacheModule.register({ isGlobal: true }),
    MainModule,
    MintModule, CollectionModule, NftModule, MetadataModule, SwapModule,
  ],
})
export class AppModule implements NestModule {

  constructor(private config: AppConfigService) {
  }

  configure(consumer: MiddlewareConsumer) {
    const middlewares: { new(): NestMiddleware }[] = [];
    if (this.config.logRequests) {
      middlewares.push(LogRequestMiddleware);
    }
    consumer.apply(...middlewares).forRoutes('*');
  }
}
