import { IsNotEmpty } from 'class-validator';

export class MintDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  //Image here
}