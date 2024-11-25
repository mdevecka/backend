import { UnityRoomId } from '@modules/app-db/entities';

export interface ExhibitionDto {
  name: string;
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    name: string;
    slug: string;
  }
  artwork: {
    name: string;
    slug: string;
  }
  activeRoomId: UnityRoomId;
  slug: string;
}
