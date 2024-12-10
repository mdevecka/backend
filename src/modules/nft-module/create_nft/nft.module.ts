import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftCreator } from './nft.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { NftConfigModule } from '@modules/config';

@Module({
  imports: [AppDbModule, AuthModule, NftConfigModule],
  controllers: [NftController],
  providers: [NftCreator],
})
export class NftModule {
}