import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { collectionCreator } from './collection.service';

@Module({
  imports: [],
  controllers: [CollectionController],
  providers: [collectionCreator],
})
export class CollectionModule {}