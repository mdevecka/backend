import { IsString, IsNotEmpty } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';

export class NftDto {
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsNotEmpty()
  file: MemoryStoredFile;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  metadata: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}