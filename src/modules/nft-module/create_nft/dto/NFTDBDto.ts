import { IsString, IsNotEmpty } from 'class-validator';

export class NftDBDto {
  @IsString()
  @IsNotEmpty()
  ipfsLink: string;
}