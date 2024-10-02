import { ArtworkId, ExhibitionId, UnityRoomId, UnityWallId, UnityImageId, UnityLampId, UnityItemId, UnityItemTypeId } from '@modules/app-db/entities';

export interface DesignerRoomDto {
  id: UnityRoomId;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  length: number;
  exhibitionId: ExhibitionId;
  walls: DesignerWallDto[];
  lamps: DesignerLampDto[];
  items: DesignerItemDto[];
}

export interface DesignerWallDto {
  id: UnityWallId;
  x: number;
  y: number;
  z: number;
  rotation: number;
  width: number;
  height: number;
  thick: number;
  color: string;
  opacity: number;
  artworkId: ArtworkId;
  images: DesignerImageDto[];
}

export interface DesignerImageDto {
  id: UnityImageId;
  x: number;
  y: number;
  scale: number;
  artworkId: ArtworkId;
}

export interface DesignerLampDto {
  id: UnityLampId;
  x: number;
  y: number;
  z: number;
  range: number;
  shadow: boolean;
}

export interface DesignerItemDto {
  id: UnityItemId;
  x: number;
  y: number;
  z: number;
  rotation: number;
  itemTypeId: UnityItemTypeId;
}
