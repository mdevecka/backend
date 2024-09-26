import { OptionDto } from '@common/helpers';
import { CountryDto } from './country.dto';

export interface ArtistDetailDto {
  id: string;
  name: string;
  born: string;
  biography: string;
  country: CountryDto;
  artistCategory: OptionDto;
  public: boolean;
}
