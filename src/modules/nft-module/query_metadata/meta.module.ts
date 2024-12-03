import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaFetcher } from './meta.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';
import { AppConfigModule } from '@modules/config/config.module';

@Module({
  imports: [AppDbModule, AuthModule, AppConfigModule],
  controllers: [MetaController],
  providers: [MetaFetcher],
})
export class MetadataModule { }