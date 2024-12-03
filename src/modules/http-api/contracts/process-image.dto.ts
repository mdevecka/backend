import { ArtworkImageId, AiGeneratedStatus } from '@modules/app-db/entities';
import { AiArtworkMetadata } from './ai-artwork-metadata.dto';

export interface ProcessImageDataDto {
  id: ArtworkImageId;
  aiGenerated: AiGeneratedStatus;
  metadata: AiArtworkMetadata;
}
