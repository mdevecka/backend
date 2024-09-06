import { IsNotEmpty, IsOptional } from 'class-validator';
import { MemoryStoredFile, IsFile, MaxFileSize, HasMimeType } from 'nestjs-form-data';

export class CollectionDto {
  @IsFile()
  //@MaxFileSize(10e6) // 10MB
  @IsOptional()
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  metadata: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  userID: string;
}