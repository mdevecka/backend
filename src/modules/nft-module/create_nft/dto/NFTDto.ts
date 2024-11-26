import { IsString, IsNotEmpty } from 'class-validator';

export class NftDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class NftDBDto {
  @IsString()
  @IsNotEmpty()
  ipfsLink: string;
}

export class NftUpdateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  metadata: string;
}