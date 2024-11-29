import { IsString, IsStrongPassword } from 'class-validator';
import { passwordOptions } from './options';

export class ResetPasswordDto {

  @IsString()
  token: string;

  @IsStrongPassword(passwordOptions)
  password: string;

}
