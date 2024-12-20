import { ArtworkId } from '@modules/app-db/entities';

export type Message = ResyncImageMessage;

export interface ResyncImageMessage {
  type: "ResyncImageMessage";
  id?: ArtworkId;
}
