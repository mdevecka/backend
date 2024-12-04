import { IsUUID } from 'class-validator';
import { ArtworkId } from '@modules/app-db/entities';

export class AiProcessImageDto {
  @IsUUID()
  id: ArtworkId;
}
