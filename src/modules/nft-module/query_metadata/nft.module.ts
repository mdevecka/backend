import { Module } from '@nestjs/common';
import { MetaController } from './nft.controller';
import { MetaFetcher } from './nft.service';

@Module({
  imports: [],
  controllers: [MetaController],
  providers: [MetaFetcher],
})
export class MetadataModule { }