import { IsString, IsStrongPassword } from 'class-validator';
import { passwordOptions } from './options';

export class ChangePasswordDto {

  @IsString()
  oldPassword: string;

  @IsStrongPassword(passwordOptions)
  newPassword: string;

}
