import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { nftCreator } from './nft.service';

@Module({
  imports: [],
  controllers: [NftController],
  providers: [nftCreator],
})
export class NftModule {}