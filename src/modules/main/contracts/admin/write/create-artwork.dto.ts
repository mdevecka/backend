import { ValidateIf, IsString, IsNumberString, IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ArtworkGenreExists, ArtworkWorktypeExists, ArtworkMaterialExists, ArtworkTechniqueExists } from '@modules/app-db/validators';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { EMPTY } from '@common/helpers';

export class CreateArtworkDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumberString()
  year: string;

  @IsOptional()
  @IsString()
  tags: string;

  @IsOptional()
  @IsBoolean()
  public: boolean

  @IsString()
  measurements: string;

  @IsUUID()
  artistId: string;

  @IsUUID()
  @ArtworkGenreExists()
  artworkGenreId: string;

  @IsUUID()
  @ArtworkWorktypeExists()
  artworkWorktypeId: string;

  @IsUUID()
  @ArtworkMaterialExists()
  artworkMaterialId: string;

  @IsUUID()
  @ArtworkTechniqueExists()
  artworkTechniqueId: string;

  @IsOptional()
  @ValidateIf(art => art.exhibitions !== "")
  @IsArray()
  @IsUUID(null, { each: true })
  exhibitions: string[] | EMPTY;

  @IsOptional()
  @ValidateIf(art => art.image !== "")
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile | EMPTY;

}
