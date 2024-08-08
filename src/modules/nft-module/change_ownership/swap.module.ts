import { Module } from '@nestjs/common';
import { SwapController } from './swap.controller';
import { SwapCreator } from './swap.service';

@Module({
  imports: [],
  controllers: [SwapController],
  providers: [SwapCreator],
})
export class SwapModule {}