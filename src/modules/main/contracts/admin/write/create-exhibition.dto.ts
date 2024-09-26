import { IsString, IsBoolean, IsOptional, IsUUID, IsDateString, IsArray, ValidateIf } from 'class-validator';
import { EMPTY } from '@common/helpers';

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
  galleryId: string;

  @IsOptional()
  @ValidateIf(ex => ex.artworks !== "")
  @IsArray()
  @IsUUID(null, { each: true })
  artworks: string[] | EMPTY;

  @IsOptional()
  @IsBoolean()
  public: boolean;

}
