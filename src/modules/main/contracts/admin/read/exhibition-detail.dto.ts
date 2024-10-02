import { ExhibitionId, GalleryId } from '@modules/app-db/entities';

export interface ExhibitionDetailDto {
  id: ExhibitionId;
  name: string;
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    id: GalleryId;
    name: string;
    description: string;
    address: string;
    gps: string;
  }
  public: boolean;
}
