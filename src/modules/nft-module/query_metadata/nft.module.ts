import { Module } from '@nestjs/common';
import { MetaController } from './nft.controller';
import { metaFetcher } from './nft.service';

@Module({
  imports: [],
  controllers: [MetaController],
  providers: [metaFetcher],
})
export class MetadataModule {}