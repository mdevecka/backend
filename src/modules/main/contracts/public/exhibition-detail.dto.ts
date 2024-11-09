import { UnityRoomId } from '@modules/app-db/entities';

export interface ExhibitionDetailDto {
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    name: string;
    slug: string;
  }
  activeRoomId: UnityRoomId;
}
