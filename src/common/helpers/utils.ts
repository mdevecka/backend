import { getMetadataArgsStorage } from 'typeorm';
import { OptionDto } from './option.dto';

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

export function convertLink(link: string): string {
  let metadata = link;

  if (metadata.startsWith("ipfs://ipfs/")) {
    metadata = "https://flk-ipfs.xyz/ipfs" + metadata.slice(11);
  }
  else if (metadata.startsWith("https://ipfs.io/ipfs/")) {
    metadata = "https://flk-ipfs.xyz/ipfs/" + metadata.slice(16);
  }
  else if (metadata.startsWith("ipfs:/")) {
    metadata = "https://flk-ipfs.xyz/ipfs/" + metadata.slice(7);
  }
  else if (!metadata.startsWith("https://flk-ipfs.xyz/")) {
    metadata = "https://flk-ipfs.xyz/ipfs/" + metadata;
  }
  return metadata;
}

export async function fetchMetadataFromIPFS(metadatalink: string): Promise<string> {
  // Fetch metadata from IPFS
  // Return the metadata 
  try {
    const response = await fetch(metadatalink);
    if (!response.ok) {
      return null;
    }
    if (response != null) {
      const parsed_data = await response.json();
      //If data doesnt contain description field or Description field return null
      if (parsed_data.description != null) {
        return parsed_data.description;
      }
      else if (parsed_data.Description != null) {
        return parsed_data.Description;
      }
      return null;
    }

  } catch (error) {
    this.logger.error(error);
    return null;
  }
}