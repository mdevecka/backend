import { IsString, IsBooleanString, IsOptional, IsUUID } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';
import { CountryExists } from '@modules/app-db/validators';
import { CountryId } from '@modules/app-db/entities';

export class CreateGalleryDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsUUID()
  @CountryExists()
  countryId: CountryId;

  @IsOptional()
  @IsString()
  gps: string;

  @IsOptional()
  @IsBooleanString()
  public: boolean;

  @IsOptional()
  @AllowEmpty()
  @IsFile()
  @HasMimeType(imageMimeTypes)
  image: MemoryStoredFile | EMPTY;

}
