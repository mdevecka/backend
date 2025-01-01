import { IsString, IsOptional } from 'class-validator';
import { IsFile, HasMimeType } from 'nestjs-form-data';
import { FileType, EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';

export class ChangeUserDto {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @AllowEmpty()
  @IsFile()
  @HasMimeType(imageMimeTypes)
  avatar: FileType | EMPTY;

}
