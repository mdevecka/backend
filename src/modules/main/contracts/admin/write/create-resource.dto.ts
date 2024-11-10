import { IsString, IsOptional, IsBooleanString } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { imageMimeTypes, audioMimeTypes } from '@common/helpers';

export class CreateResourceDto {

  @IsString()
  name: string;

  @IsFile()
  @HasMimeType([...imageMimeTypes, ...audioMimeTypes])
  data: MemoryStoredFile;

  @IsOptional()
  @IsBooleanString()
  public: boolean;

}
