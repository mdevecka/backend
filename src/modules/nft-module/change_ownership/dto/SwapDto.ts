import { IsNotEmpty } from 'class-validator';

export class SwapDto {
  @IsNotEmpty()
  address: string;
}