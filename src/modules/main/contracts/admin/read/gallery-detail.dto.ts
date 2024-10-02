import { CountryDto } from './country.dto';
import { GalleryId } from '@modules/app-db/entities';

export interface GalleryDetailDto {
  id: GalleryId;
  name: string;
  description: string;
  address: string;
  country: CountryDto;
  gps: string;
  public: boolean;
}
