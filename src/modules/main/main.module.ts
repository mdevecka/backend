import { Module } from '@nestjs/common';
import { AppDbModule } from '@modules/.';
import { AdminController } from './controllers';

@Module({
  imports: [AppDbModule],
  controllers: [AdminController],
  providers: [],
})
export class MainModule { }