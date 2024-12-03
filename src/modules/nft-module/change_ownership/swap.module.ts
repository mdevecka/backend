import { Module } from '@nestjs/common';
import { SwapController } from './swap.controller';
import { SwapCreator } from './swap.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { AppConfigModule } from '@modules/config/config.module';

@Module({
  imports: [AppDbModule, AuthModule, AppConfigModule],
  controllers: [SwapController],
  providers: [SwapCreator],
})
export class SwapModule { }