import { OptionDto } from './option.dto';

export interface GalleryDto {
  id: string;
  description: string;
  street: string;
  city: string;
  postcode: string;
  country: OptionDto;
  gps: string;
  active: boolean;
}
