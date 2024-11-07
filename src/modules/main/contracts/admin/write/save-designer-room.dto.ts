import { IsString, IsNumber, IsBoolean, IsArray, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { ItemTypeExists } from '@modules/app-db/validators';
import { Type } from 'class-transformer';
import { UnityRoomId, ExhibitionId, ArtworkId, UnityItemTypeId, ResourceId } from '@modules/app-db/entities';

export class SaveDesignerRoomDto {

  @IsUUID()
  id: UnityRoomId;

  @IsString()
  name: string;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  length: number;

  @IsOptional()
  @IsUUID()
  environmentImageId: ResourceId;

  @IsOptional()
  @IsUUID()
  backgroundMusicId: ResourceId;

  @IsUUID()
  exhibitionId: ExhibitionId;

  @ValidateNested()
  @IsArray()
  @Type(() => CreateDesignerWallDto)
  walls: CreateDesignerWallDto[];

  @ValidateNested()
  @IsArray()
  @Type(() => CreateDesignerLampDto)
  lamps: CreateDesignerLampDto[];

  @ValidateNested()
  @IsArray()
  @Type(() => CreateDesignerItemDto)
  items: CreateDesignerItemDto[];

}

export class CreateDesignerWallDto {

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  z: number;

  @IsNumber()
  rotation: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  thick: number;

  @IsString()
  color: string;

  @IsNumber()
  opacity: number;

  @IsOptional()
  @IsString()
  artworkId: ArtworkId;

  @ValidateNested()
  @IsArray()
  @Type(() => CreateDesignerImageDto)
  images: CreateDesignerImageDto[];

}

export class CreateDesignerImageDto {

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  scale: number;

  @IsUUID()
  artworkId: ArtworkId;

}

export class CreateDesignerLampDto {

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  z: number;

  @IsNumber()
  range: number;

  @IsBoolean()
  shadow: boolean;

}

export class CreateDesignerItemDto {

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  z: number;

  @IsNumber()
  rotation: number;

  @IsUUID()
  @ItemTypeExists()
  itemTypeId: UnityItemTypeId;

}
