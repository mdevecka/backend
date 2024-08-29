import { Module } from '@nestjs/common';
import { SwapController } from './swap.controller';
import { SwapCreator } from './swap.service';
import { AppDbModule } from '@modules/app-db';

@Module({
  imports: [AppDbModule],
  controllers: [SwapController],
  providers: [SwapCreator],
})
export class SwapModule { }