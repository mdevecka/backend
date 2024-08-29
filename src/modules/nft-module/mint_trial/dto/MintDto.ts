import { IsNotEmpty } from 'class-validator';
import { MemoryStoredFile, IsFile, MaxFileSize, HasMimeType } from 'nestjs-form-data';

export class MintDto {
  @IsFile()
  @MaxFileSize(10e6) // 10MB
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsNotEmpty()
  file: MemoryStoredFile;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  userId: string;

}