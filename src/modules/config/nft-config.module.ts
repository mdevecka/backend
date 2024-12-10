import { Module } from '@nestjs/common';
import { AppDbModule } from '@modules/app-db/app-db.module';
import { NftConfigService } from './nft-config.service';

@Module({
  imports: [AppDbModule],
  controllers: [],
  providers: [NftConfigService],
  exports: [NftConfigService],
})
export class NftConfigModule { }