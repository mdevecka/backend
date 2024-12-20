import { Module, Global } from '@nestjs/common';
import { MessengerService } from './messenger.service';

@Global()
@Module({
  imports: [],
  providers: [MessengerService],
  exports: [MessengerService],
})
export class MessengerModule { }
