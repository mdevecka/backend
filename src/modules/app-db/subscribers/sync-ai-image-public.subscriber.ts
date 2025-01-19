import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { MessengerService } from '@modules/messenger';
import { Artwork, Artist, ArtworkId, ArtistId } from '../entities';

@Injectable()
@EventSubscriber()
export class SyncAiImagePublicSubscriber implements EntitySubscriberInterface<any> {

  constructor(connection: Connection, private messenger: MessengerService) {
    connection.subscribers.push(this);
  }

  afterInsert(event: InsertEvent<any>) {
    if (!this.isValidEvent(event))
      return;
    const entity = event.entity as (Artist | Artwork);
    if (entity.public != null) {
      this.handleUpdate(entity, entity.id, entity.public);
    }
  }

  afterUpdate(event: UpdateEvent<any>) {
    if (!this.isValidEvent(event))
      return;
    const entity = event.entity as (Artist | Artwork);
    if (entity.public != null) {
      this.handleUpdate(entity, entity.id, entity.public);
    }
  }

  afterRemove(event: RemoveEvent<any>) {
    if (!this.isValidEvent(event))
      return;
    const entity = event.entity as (Artist | Artwork);
    this.handleUpdate(entity, event.entityId, false);
  }

  private handleUpdate(entity: Artwork | Artist, id: string, isPublic: boolean) {
    if (entity instanceof Artwork) {
      this.handleArtworkUpdate(id, isPublic);
    } else {
      this.handleArtistUpdate(id, isPublic);
    }
  }

  private handleArtworkUpdate(id: ArtworkId, isPublic: boolean) {
    this.messenger.sendMessage({ type: "ResyncArtworkAiStateMessage", id: id, public: isPublic });
  }

  private handleArtistUpdate(id: ArtistId, isPublic: boolean) {
    this.messenger.sendMessage({ type: "ResyncArtistAiStateMessage", id: id, public: isPublic });
  }

  private isValidEvent(event: InsertEvent<any> | UpdateEvent<any> | RemoveEvent<any>) {
    const target = event.metadata?.target;
    if (event.entity == null)
      return false;
    return (target === Artwork) || (target === Artist);
  }

}
