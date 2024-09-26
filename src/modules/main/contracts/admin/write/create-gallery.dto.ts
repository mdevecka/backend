import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CountryExists } from '@modules/app-db/validators';

export class CreateGalleryDto {

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsUUID()
  @CountryExists()
  countryId: string;

  @IsString()
  gps: string;

  @IsOptional()
  @IsBoolean()
  public: boolean;

}
