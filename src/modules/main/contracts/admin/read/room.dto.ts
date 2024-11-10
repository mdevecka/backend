import { ExhibitionDto } from './exhibition.dto';
import { UnityRoomId } from '@modules/app-db/entities';

export interface RoomDto {
  id: UnityRoomId;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  length: number;
  exhibition: ExhibitionDto;
}
