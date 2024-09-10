import { CountryDto } from './country.dto';

export interface GalleryDto {
  id: string;
  name: string;
  description: string;
  address: string;
  country: CountryDto;
  gps: string;
  active: boolean;
}
