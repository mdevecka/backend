import { IsString, IsOptional, IsStrongPassword } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';
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
  avatar: MemoryStoredFile | EMPTY;

}
