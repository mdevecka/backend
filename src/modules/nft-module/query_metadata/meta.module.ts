import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaFetcher } from './meta.service';
import { AppDbModule } from '@modules/app-db';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [AppDbModule, AuthModule],
  controllers: [MetaController],
  providers: [MetaFetcher],
})
export class MetadataModule { }