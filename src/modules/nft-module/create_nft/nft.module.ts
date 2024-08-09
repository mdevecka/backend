import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftCreator } from './nft.service';

@Module({
  imports: [],
  controllers: [NftController],
  providers: [NftCreator],
})
export class NftModule {}