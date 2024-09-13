import { CountryDto } from './country.dto';

export interface GalleryDetailDto {
  id: string;
  name: string;
  description: string;
  address: string;
  country: CountryDto;
  gps: string;
  public: boolean;
}
