import { OptionDto } from './option.dto';

export interface ArtistDetailDto {
  id: string;
  name: string;
  born: string;
  biography: string;
  country: OptionDto;
  artistCategory: OptionDto;
  active: boolean;
}
