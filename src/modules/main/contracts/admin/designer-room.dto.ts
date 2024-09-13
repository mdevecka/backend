export interface DesignerRoomDto {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  length: number;
  exhibitionId: string;
  walls: DesignerWallDto[];
  lamps: DesignerLampDto[];
  items: DesignerItemDto[];
}

export interface DesignerWallDto {
  id: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  width: number;
  height: number;
  thick: number;
  color: string;
  opacity: number;
  artworkId: string;
  images: DesignerImageDto[];
}

export interface DesignerImageDto {
  id: string;
  x: number;
  y: number;
  scale: number;
  artworkId: string;
}

export interface DesignerLampDto {
  id: string;
  x: number;
  y: number;
  z: number;
  range: number;
  shadow: boolean;
}

export interface DesignerItemDto {
  id: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  itemTypeId: string;
}
