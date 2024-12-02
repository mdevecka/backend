import { IsString, IsNumberString, IsOptional, IsUUID } from 'class-validator';
import { AllowEmpty } from '@common/helpers';
import { ArtistId } from '@modules/app-db/entities';

export class CreateArtworNFTDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumberString()
  year: string;

  @IsUUID()
  artistId: ArtistId;

  @IsOptional()
  @AllowEmpty()
  nftId: string;

}
