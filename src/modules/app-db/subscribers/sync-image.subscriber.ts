import { Injectable } from '@nestjs/common';
import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { MessengerService } from '@modules/messenger';
import { Artwork, Artist } from '../entities';

@Injectable()
@EventSubscriber()
export class SyncImageSubscriber implements EntitySubscriberInterface<any> {

  constructor(connection: Connection, private messenger: MessengerService) {
    connection.subscribers.push(this);
  }

  afterInsert(event: InsertEvent<any>) {
    this.handleEvent(event);
  }

  afterUpdate(event: UpdateEvent<any>) {
    this.handleEvent(event);
  }

  afterRemove(event: RemoveEvent<any>) {
    this.handleEvent(event);
  }

  private handleEvent(event: InsertEvent<any> | UpdateEvent<any> | RemoveEvent<any>) {
    if (this.isValidTarget(event.metadata?.target)) {
      this.messenger.sendMessage({ type: "ResyncImageMessage" });
    }
  }

  private isValidTarget(target: any) {
    return (target === Artwork) || (target === Artist);
  }

}
