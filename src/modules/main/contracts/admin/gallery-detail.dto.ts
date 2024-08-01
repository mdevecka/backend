import { OptionDto } from './option.dto';

export interface GalleryDetailDto {
  id: string;
  description: string;
  street: string;
  city: string;
  postcode: string;
  country: OptionDto;
  gps: string;
  active: boolean;
}
