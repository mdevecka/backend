import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintCreator } from './mint.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { NftConfigModule } from '@modules/config';

@Module({
  imports: [AppDbModule, AuthModule, NftConfigModule],
  controllers: [MintController],
  providers: [MintCreator],
})
export class MintModule { }