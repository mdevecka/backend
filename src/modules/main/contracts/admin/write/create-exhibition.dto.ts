import { IsString, IsBoolean, IsOptional, IsUUID, IsDateString, IsArray, ValidateIf } from 'class-validator';
import { EMPTY } from '@common/helpers';
import { GalleryId, ArtworkId } from '@modules/app-db/entities';

export class CreateExhibitionDto {

  @IsString()
  name: string;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;

  @IsString()
  curator: string;

  @IsUUID()
  galleryId: GalleryId;

  @IsOptional()
  @ValidateIf(ex => ex.artworks !== "")
  @IsArray()
  @IsUUID(null, { each: true })
  artworks: ArtworkId[] | EMPTY;

  @IsOptional()
  @IsBoolean()
  public: boolean;

}
