import { IsString, IsOptional, IsStrongPassword } from 'class-validator';
import { IsFile, HasMimeType } from 'nestjs-form-data';
import { FileType, EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';
import { passwordOptions } from './options';

export class CreateUserDto {

  @IsString()
  token: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsStrongPassword(passwordOptions)
  password: string;

  @IsOptional()
  @AllowEmpty()
  @IsFile()
  @HasMimeType(imageMimeTypes)
  avatar: FileType | EMPTY;

}
