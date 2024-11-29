import { IsString, IsOptional } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';

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
  avatar: MemoryStoredFile | EMPTY;

}
