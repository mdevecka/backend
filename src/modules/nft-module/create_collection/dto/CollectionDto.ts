import { IsNotEmpty } from 'class-validator';
import { MemoryStoredFile, IsFile, MaxFileSize, HasMimeType } from 'nestjs-form-data';

export class CollectionDto {
  @IsFile()
  @MaxFileSize(10e6) // 10MB
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  userID: string;
}