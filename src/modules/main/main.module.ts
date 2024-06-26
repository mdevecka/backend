import { Module } from '@nestjs/common';
import { MainController } from './controllers';
import { MainService } from './services';

@Module({
  imports: [],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule { }