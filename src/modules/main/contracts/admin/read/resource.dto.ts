import { ResourceId } from '@modules/app-db/entities';

export interface ResourceDto {
  id: ResourceId;
  name: string;
  mimeType: string;
  public: boolean;
}
