import { IsStrongPasswordOptions } from 'class-validator';

export const passwordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1
}
