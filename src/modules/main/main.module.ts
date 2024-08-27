import { Module } from '@nestjs/common';
import { AppDbModule, AuthModule } from '@modules/.';
import { AdminController } from './controllers';

@Module({
  imports: [AppDbModule, AuthModule],
  controllers: [AdminController],
  providers: [],
})
export class MainModule { }