import { IsNotEmpty } from 'class-validator';

export class SwapDto {
  @IsNotEmpty()
  assetID: string;
  @IsNotEmpty()
  collectionID: string;
  @IsNotEmpty()
  address: string;
}