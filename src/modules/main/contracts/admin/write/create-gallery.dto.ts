import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CountryExists } from '@modules/app-db/validators';
import { CountryId } from '@modules/app-db/entities';

export class CreateGalleryDto {

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsUUID()
  @CountryExists()
  countryId: CountryId;

  @IsString()
  gps: string;

  @IsOptional()
  @IsBoolean()
  public: boolean;

}
