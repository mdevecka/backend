import { IsString, IsBooleanString, IsOptional, IsUUID } from 'class-validator';
import { IsFile, HasMimeType } from 'nestjs-form-data';
import { FileType, EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';
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
  public: string;

  @IsOptional()
  @AllowEmpty()
  @IsFile()
  @HasMimeType(imageMimeTypes)
  image: FileType | EMPTY;

}
