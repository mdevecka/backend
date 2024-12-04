import { Module, NestModule, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '@common/config';
import { LogRequestMiddleware } from '@common/middleware';
import { MainModule } from '@modules/.';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MintModule } from '@modules/nft-module/mint_trial/mint.module';
import { CollectionModule } from '@modules/nft-module/create_collection/collection.module';
import { NftModule } from '@modules/nft-module/create_nft/nft.module';
import { MetadataModule } from '@modules/nft-module/query_metadata/meta.module';
import { SwapModule } from '@modules/nft-module/change_ownership/swap.module';
import { AppConfigModule } from '@modules/config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<AppConfig>) => ({
        type: 'postgres',
        host: config.get("POSTGRES_HOST"),
        port: parseInt(config.get("POSTGRES_PORT")),
        username: config.get("POSTGRES_USER"),
        password: config.get("POSTGRES_PASSWORD"),
        database: config.get("POSTGRES_DATABASE"),
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        migrationsTableName: "migration",
        migrations: ["dist/src/migrations/*.js"],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<AppConfig>) => ({
        secret: configService.get<string>("AI_ACCESS_TOKEN_SECRET"),
      }),
      inject: [ConfigService],
    }),
    // todo use Redis as cache provider
    CacheModule.register({ isGlobal: true }),
    MainModule,
    MintModule, CollectionModule, NftModule, MetadataModule, SwapModule, AppConfigModule,
  ],
})
export class AppModule implements NestModule {

  constructor(private config: ConfigService<AppConfig>) {
  }

  configure(consumer: MiddlewareConsumer) {
    const middlewares: { new(): NestMiddleware }[] = [];
    if (this.config.get("LOG_REQUESTS") === "true") {
      middlewares.push(LogRequestMiddleware);
    }
    consumer.apply(...middlewares).forRoutes('*');
  }
}
