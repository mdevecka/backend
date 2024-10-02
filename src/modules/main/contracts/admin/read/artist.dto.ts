import { OptionDto } from '@common/helpers';
import { CountryDto } from './country.dto';
import { ArtistId, ArtistCategoryId } from '@modules/app-db/entities';

export interface ArtistDto {
  id: ArtistId;
  name: string;
  born: string;
  biography: string;
  country: CountryDto;
  artistCategory: OptionDto<ArtistCategoryId>;
  public: boolean;
}
