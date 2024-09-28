import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintCreator } from './mint.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
  imports: [AppDbModule, AuthModule],
  controllers: [MintController],
  providers: [MintCreator],
})
export class MintModule { }