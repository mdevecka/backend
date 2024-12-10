import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from '@modules/config';
import { filterEntities } from '@common/helpers';
import * as entities from '@modules/app-db/entities';

const allEntities = filterEntities(Object.values(entities));

@Module({
  imports: [
    ConfigModule.forRoot(),
  ]
})
class AppConfigModule { }

async function createDataSource() {
  const app = await NestFactory.create(AppConfigModule);
  const config = app.get<ConfigService<AppConfig>>(ConfigService);
  const connectionOptions: DataSourceOptions = {
    type: "postgres",
    host: config.get("POSTGRES_HOST"),
    port: parseInt(config.get("POSTGRES_PORT")),
    username: config.get("POSTGRES_USER"),
    password: config.get("POSTGRES_PASSWORD"),
    database: config.get("POSTGRES_DATABASE"),
    entities: allEntities,
    migrationsTableName: "migration",
    migrations: ["src/migrations/*.ts"],
    namingStrategy: new SnakeNamingStrategy(),
  };
  await app.close();
  return new DataSource(connectionOptions);
}

export default createDataSource();
