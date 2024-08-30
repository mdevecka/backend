import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintCreator } from './mint.service';
import { AppDbModule } from '@modules/app-db';
import { NestjsFormDataModule } from 'nestjs-form-data';


@Module({
  imports: [AppDbModule, NestjsFormDataModule],
  controllers: [MintController],
  providers: [MintCreator],
})
export class MintModule { }