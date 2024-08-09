import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionCreator } from './collection.service';

@Module({
  imports: [],
  controllers: [CollectionController],
  providers: [CollectionCreator],
})
export class CollectionModule {}