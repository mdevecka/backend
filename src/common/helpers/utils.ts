import { DataSource, EntityManager, getMetadataArgsStorage } from 'typeorm';
import { DriverUtils } from 'typeorm/driver/DriverUtils';
import { OptionDto } from './option.dto';
import { AppConfig } from '@common/config';
import { ConfigService } from '@nestjs/config';

export type EMPTY = "";

export type Environment = "local" | "development" | "production" | "test";

export const imageMimeTypes = ['image/jpeg', 'image/png', 'image/tiff'];

export const audioMimeTypes = ['audio/mpeg'];

export function getEnv(): Environment {
  return (process.env.NODE_ENV as Environment) || "local";
}

export function isEntity(type: object) {
  const tables = getMetadataArgsStorage().tables;
  return tables.some(t => t.target === type);
}

export function filterEntities(types: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return types.filter(t => isEntity(t)) as Function[];
}

export function createOptionDto<T>(entity: { id: T, name: string }): OptionDto<T> {
  if (entity == null)
    return null;
  return {
    id: entity.id,
    name: entity.name,
  };
}

export function mapAsync<T, S>(list: Promise<T[]>, mapper: (item: T) => S): Promise<S[]> {
  return list.then(items => items.map(mapper));
}

export function mapOptionsAsync<T>(list: Promise<{ id: T, name: string }[]>): Promise<OptionDto<T>[]> {
  return mapAsync(list, createOptionDto);
}

export function mapEmpty<T, S>(value: T | EMPTY, mapper: (value: T) => S, defaultEmpty: S = null): S {
  if (value === undefined)
    return undefined;
  if (value === null || value === "")
    return defaultEmpty;
  return mapper(value);
}

export function convertIpfsLink(link: string): string {
  let metadata = link;

  if (metadata.startsWith("ipfs://ipfs/")) {
    metadata = "https://ipfs1.fiit.stuba.sk/ipfs" + metadata.slice(11);
  }
  else if (metadata.startsWith("https://ipfs.io/ipfs/")) {
    metadata = "https://ipfs1.fiit.stuba.sk/ipfs" + metadata.slice(16);
  }
  else if (metadata.startsWith("ipfs:/")) {
    metadata = "https://ipfs1.fiit.stuba.sk/ipfs" + metadata.slice(7);
  }
  else if (!metadata.startsWith("https://ipfs1.fiit.stuba.sk")) {
    metadata = "https://ipfs1.fiit.stuba.sk/ipfs" + metadata;
  }
  return metadata;
}

export async function fetchMetadataFromIPFS(metadatalink: string): Promise<string> {
  // Fetch metadata from IPFS
  // Return the metadata 
  const configService = new ConfigService<AppConfig>();

  try {
    const response = await fetch(metadatalink, {
      headers: {
        'Authorization': 'Basic ' + btoa(configService.get('IPFS_USERNAME')+':'+configService.get('IPFS_PASSWORD'))
      }
    });
    if (!response.ok) {
      return null;
    }
    if (response != null) {
      const parsed_data = await response.json();
      return parsed_data;
    }

  } catch (error) {
    this.logger.error(error);
    return null;
  }

}

export function deserializeEntity<T>(_dataSource: DataSource | EntityManager, entityType: { new(): T }, rawData: any, customTableAlias?: string) {
  const dataSource = (_dataSource instanceof DataSource) ? _dataSource : _dataSource.connection;
  const driver = dataSource.driver;
  const metadata = dataSource.getMetadata(entityType);
  const entity = new entityType();
  const columns = metadata.columns;
  for (const column of columns) {
    if (column.isVirtual)
      continue;
    const tableAlias = customTableAlias ?? metadata.tableName;
    const propName = DriverUtils.buildAlias(driver, undefined, tableAlias, column.databaseName);
    const value = rawData[propName];
    if (value === undefined)
      continue;
    const convertedValue = driver.prepareHydratedValue(value, column);
    column.setEntityValue(entity, convertedValue);
  }
  return entity as T;
}
