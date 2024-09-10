import { IsNotEmpty } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';

export class MintDto {
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsNotEmpty()
  file: MemoryStoredFile;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  metadata: string;
  @IsNotEmpty()
  artworkId: string;
}