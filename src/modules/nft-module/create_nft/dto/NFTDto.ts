import { IsString, IsNotEmpty } from 'class-validator';

export class NftDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}