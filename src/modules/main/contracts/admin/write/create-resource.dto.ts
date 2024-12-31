import { IsString, IsOptional, IsBooleanString } from 'class-validator';
import { IsFile, HasMimeType } from 'nestjs-form-data';
import { FileType, imageMimeTypes, audioMimeTypes } from '@common/helpers';

export class CreateResourceDto {

  @IsString()
  name: string;

  @IsFile()
  @HasMimeType([...imageMimeTypes, ...audioMimeTypes])
  data: FileType;

  @IsOptional()
  @IsBooleanString()
  public: boolean;

}
