import { Module, NestModule, NestMiddleware, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '@common/config';
import { LogRequestMiddleware } from '@common/middleware';
import { MainModule } from '@modules/.';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MintModule } from '@modules/nft-module/mint_trial/mint.module';

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
      }),
      inject: [ConfigService],
    }),
    MainModule, MintModule
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
