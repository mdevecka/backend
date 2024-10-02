import { ValidateIf, IsString, IsNumberString, IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ArtworkGenreExists, ArtworkWorktypeExists, ArtworkMaterialExists, ArtworkTechniqueExists } from '@modules/app-db/validators';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { EMPTY } from '@common/helpers';
import { ArtistId, ArtworkGenreId, ArtworkWorktypeId, ArtworkMaterialId, ArtworkTechniqueId, ExhibitionId } from '@modules/app-db/entities';

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
  artistId: ArtistId;

  @IsUUID()
  @ArtworkGenreExists()
  artworkGenreId: ArtworkGenreId;

  @IsUUID()
  @ArtworkWorktypeExists()
  artworkWorktypeId: ArtworkWorktypeId;

  @IsUUID()
  @ArtworkMaterialExists()
  artworkMaterialId: ArtworkMaterialId;

  @IsUUID()
  @ArtworkTechniqueExists()
  artworkTechniqueId: ArtworkTechniqueId;

  @IsOptional()
  @ValidateIf(art => art.exhibitions !== "")
  @IsArray()
  @IsUUID(null, { each: true })
  exhibitions: ExhibitionId[] | EMPTY;

  @IsOptional()
  @ValidateIf(art => art.image !== "")
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile | EMPTY;

}
