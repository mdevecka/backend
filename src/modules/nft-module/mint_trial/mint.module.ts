import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintCreator } from './mint.service';

@Module({
  imports: [],
  controllers: [MintController],
  providers: [MintCreator],
})
export class MintModule {}