import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaFetcher } from './meta.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { NftConfigModule } from '@modules/config';

@Module({
  imports: [AppDbModule, AuthModule, NftConfigModule],
  controllers: [MetaController],
  providers: [MetaFetcher],
})
export class MetadataModule { }