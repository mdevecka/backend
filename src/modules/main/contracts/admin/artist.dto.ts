import { OptionDto } from './option.dto';

export interface ArtistDto {
  id: string;
  name: string;
  born: string;
  biography: string;
  country: OptionDto;
  artistCategory: OptionDto;
  active: boolean;
}
