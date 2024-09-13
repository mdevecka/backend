import { ExhibitionDto } from './exhibition.dto';

export interface RoomDto {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  length: number;
  exhibition: ExhibitionDto;
}
