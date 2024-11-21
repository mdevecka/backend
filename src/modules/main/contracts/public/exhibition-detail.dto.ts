import { UnityRoomId } from '@modules/app-db/entities';

export interface ExhibitionDetailDto {
  name: string;
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    name: string;
    slug: string;
    countryCode: string;
  }
  activeRoomId: UnityRoomId;
}
