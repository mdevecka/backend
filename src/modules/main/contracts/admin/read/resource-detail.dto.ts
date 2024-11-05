import { ResourceId } from '@modules/app-db/entities';

export interface ResourceDetailDto {
  id: ResourceId;
  name: string;
  mimeType: string;
}
