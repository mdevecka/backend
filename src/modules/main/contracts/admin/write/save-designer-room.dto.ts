import { IsString, IsNumber, IsBoolean, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { ItemTypeExists } from '@modules/app-db/validators';
import { Type } from 'class-transformer';

export class SaveDesignerRoomDto {

  @IsUUID()
  id: string;

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

  @IsUUID()
  exhibitionId: string;

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

  @IsString()
  artworkId: string;

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
  artworkId: string;

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
  itemTypeId: string;

}
