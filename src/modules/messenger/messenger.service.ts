import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Message } from './messages';

@Injectable()
export class MessengerService {

  private sub = new Subject<Message>();

  readonly onMessage = this.sub.asObservable();

  sendMessage(message: Message) {
    this.sub.next(message);
  }

}
