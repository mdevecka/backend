import { getMetadataArgsStorage } from 'typeorm';
import { OptionDto } from './option.dto';

export type EMPTY = "";

export type Environment = "local" | "development" | "production" | "test";

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
