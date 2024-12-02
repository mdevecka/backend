import { IsString, IsNumberString, IsOptional, IsUUID } from 'class-validator';
import { ArtistId, NftId } from '@modules/app-db/entities';

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

  @IsUUID()
  nftId: NftId;

}
