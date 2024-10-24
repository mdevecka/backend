import { IsNotEmpty, IsOptional } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { imageMimeTypes } from '@common/helpers';

export class CollectionDto {
  @IsFile()
  @IsOptional()
  @HasMimeType(imageMimeTypes)
  file: MemoryStoredFile;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  metadata: string;
  @IsNotEmpty()
  address: string;
}