import { IsString, IsNumberString, IsArray, IsBooleanString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { ArtworkGenreExists, ArtworkWorktypeExists, ArtworkMaterialExists, ArtworkTechniqueExists } from '@modules/app-db/validators';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { EMPTY, AllowEmpty, imageMimeTypes } from '@common/helpers';
import { AiMode, ArtistId, ArtworkGenreId, ArtworkWorktypeId, ArtworkMaterialId, ArtworkTechniqueId, ExhibitionId } from '@modules/app-db/entities';

export class CreateArtworkDto {

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumberString()
  year: string;

  @IsOptional()
  @IsString()
  tags: string;

  @IsOptional()
  @IsBooleanString()
  public: boolean

  @IsOptional()
  @IsString()
  measurements: string;

  @IsOptional()
  @IsEnum(AiMode)
  aiMode: AiMode;

  @IsUUID()
  artistId: ArtistId;

  @IsOptional()
  @AllowEmpty()
  @IsUUID()
  @ArtworkGenreExists()
  artworkGenreId: ArtworkGenreId | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsUUID()
  @ArtworkWorktypeExists()
  artworkWorktypeId: ArtworkWorktypeId | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsUUID()
  @ArtworkMaterialExists()
  artworkMaterialId: ArtworkMaterialId | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsUUID()
  @ArtworkTechniqueExists()
  artworkTechniqueId: ArtworkTechniqueId | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsArray()
  @IsUUID(null, { each: true })
  exhibitions: ExhibitionId[] | EMPTY;

  @IsOptional()
  @AllowEmpty()
  @IsFile()
  @HasMimeType(imageMimeTypes)
  image: MemoryStoredFile | EMPTY;

}
