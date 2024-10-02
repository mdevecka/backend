import { IsNotEmpty, IsOptional } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';

export class CollectionDto {
  @IsFile()
  @IsOptional()
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  metadata: string;
  @IsNotEmpty()
  address: string;
}