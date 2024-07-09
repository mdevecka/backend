import { Module } from '@nestjs/common';
import { AppDbModule } from '@modules/.';
import { MainController } from './controllers';
import { MainService } from './services';

@Module({
  imports: [AppDbModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule { }