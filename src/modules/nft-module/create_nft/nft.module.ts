import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftCreator } from './nft.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule } from '@modules/app-db';

@Module({
  imports: [AppDbModule, NestjsFormDataModule],
  controllers: [NftController],
  providers: [NftCreator],
})
export class NftModule { }