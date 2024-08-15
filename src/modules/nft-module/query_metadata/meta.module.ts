import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaFetcher } from './meta.service';
import { AppDbModule } from '@modules/app-db';

@Module({
  imports: [AppDbModule],
  controllers: [MetaController],
  providers: [MetaFetcher],
})
export class MetadataModule { }