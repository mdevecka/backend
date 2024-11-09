import { UnityRoomId } from '@modules/app-db/entities';

export interface ExhibitionRoomDto {
  id: UnityRoomId;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  length: number;
}
