import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintCreator } from './mint.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { AppConfigModule } from '@modules/config/config.module';


@Module({
  imports: [AppDbModule, AuthModule, AppConfigModule],
  controllers: [MintController],
  providers: [MintCreator],
})
export class MintModule { }