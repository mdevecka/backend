import { IsString, IsDateString, IsBooleanString, IsOptional, IsUUID } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { CountryExists, ArtistCategoryExists } from '@modules/app-db/validators';
import { CountryId, ArtistCategoryId } from '@modules/app-db/entities';
import { EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';

export class CreateArtistDto {

  @IsString()
  name: string;

  @IsOptional()
  @AllowEmpty()
  @IsDateString()
  born: string | EMPTY;

  @IsOptional()
  @IsString()
  biography: string;

  @IsOptional()
  @IsBooleanString()
  public: boolean;

  @IsOptional()
  @IsString()
  facebookProfileLink: string;

  @IsOptional()
  @IsString()
  instagramProfileLink: string;

  @IsOptional()
  @IsString()
  xProfileLink: string;

  @IsUUID()
  @CountryExists()
  countryId: CountryId;

  @IsOptional()
  @AllowEmpty()
  @IsUUID()
  @ArtistCategoryExists()
  artistCategoryId: ArtistCategoryId | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsFile()
  @HasMimeType(imageMimeTypes)
  avatar: MemoryStoredFile | EMPTY;

}
