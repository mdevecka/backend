import { ArtworkId, ArtistId } from '@modules/app-db/entities';

export type Message = ResyncImageMessage | ResyncArtworkAiStateMessage | ResyncArtistAiStateMessage;

export interface ResyncImageMessage {
  type: "ResyncImageMessage";
  id?: ArtworkId;
}

export interface ResyncArtworkAiStateMessage {
  type: "ResyncArtworkAiStateMessage";
  id: ArtworkId;
  public: boolean;
}

export interface ResyncArtistAiStateMessage {
  type: "ResyncArtistAiStateMessage";
  id: ArtistId;
  public: boolean;
}
