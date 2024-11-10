import { IsString, IsBooleanString, IsOptional, IsUUID } from 'class-validator';
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

}
