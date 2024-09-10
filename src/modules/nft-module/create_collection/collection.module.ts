import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionCreator } from './collection.service';
import { AppDbModule } from '@modules/app-db';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [AppDbModule, NestjsFormDataModule, AuthModule],
  controllers: [CollectionController],
  providers: [CollectionCreator],
})
export class CollectionModule { }