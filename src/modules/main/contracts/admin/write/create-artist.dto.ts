import { IsString, IsBoolean, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { CountryExists, ArtistCategoryExists } from '@modules/app-db/validators';
import { CountryId, ArtistCategoryId } from '@modules/app-db/entities';

export class CreateArtistDto {

  @IsString()
  name: string;

  @IsDateString()
  born: string;

  @IsOptional()
  @IsString()
  biography: string;

  @IsOptional()
  @IsBoolean()
  public: boolean;

  @IsUUID()
  @CountryExists()
  countryId: CountryId;

  @IsUUID()
  @ArtistCategoryExists()
  artistCategoryId: ArtistCategoryId;

}
