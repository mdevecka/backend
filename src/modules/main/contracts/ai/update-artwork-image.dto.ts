import { IsString, IsOptional, IsJSON, IsUUID, IsEnum, ValidateNested } from 'class-validator';
import { MemoryStoredFile, IsFile, HasMimeType } from 'nestjs-form-data';
import { Type } from 'class-transformer';
import { ArtworkImageId, ImageDuplicateStatus, AiGeneratedStatus } from '@modules/app-db/entities';
import { imageMimeTypes } from '@common/helpers';

export class UpdateArtworkImageMetadataDto {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  year: string;

  @IsOptional()
  @IsString()
  artworkGenre: string;

  @IsOptional()
  @IsString()
  artworkMaterial: string;

  @IsOptional()
  @IsString()
  artworkTechnique: string;

  @IsOptional()
  @IsString()
  artworkWorktype: string;

  @IsOptional()
  @IsString()
  measurements: string;

}

export class UpdateArtworkImageDataDto {

  @IsUUID()
  image_id: ArtworkImageId;

  @IsOptional()
  @IsUUID()
  modified_image_id: ArtworkImageId;

  @IsOptional()
  @IsUUID()
  closest_match_id: ArtworkImageId;

  @IsOptional()
  @IsEnum(ImageDuplicateStatus)
  image_duplicate_status: ImageDuplicateStatus;

  @IsOptional()
  @IsEnum(AiGeneratedStatus)
  ai_generated_status: AiGeneratedStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateArtworkImageMetadataDto)
  metadata: UpdateArtworkImageMetadataDto;

}

export class UpdateArtworkImageDto {

  @IsOptional()
  @IsFile()
  @HasMimeType(imageMimeTypes)
  image: MemoryStoredFile;

  @IsJSON()
  json: string;

}
