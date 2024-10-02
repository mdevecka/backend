import { CountryId } from '@modules/app-db/entities';

export interface CountryDto {
  id: CountryId;
  name: string;
  code: string;
}
