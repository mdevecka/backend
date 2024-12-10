import { Module } from '@nestjs/common';
import { SwapController } from './swap.controller';
import { SwapCreator } from './swap.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { NftConfigModule } from '@modules/config';

@Module({
  imports: [AppDbModule, AuthModule, NftConfigModule],
  controllers: [SwapController],
  providers: [SwapCreator],
})
export class SwapModule { }