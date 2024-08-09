import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintCreator } from './mint.service';
import { AppDbModule } from '@modules/app-db';

@Module({
  imports: [AppDbModule],
  controllers: [MintController],
  providers: [MintCreator],
})
export class MintModule { }