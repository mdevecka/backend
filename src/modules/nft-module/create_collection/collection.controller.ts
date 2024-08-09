import { Controller, Body, Post } from '@nestjs/common';
import { CollectionCreator } from './collection.service';
import { CollectionDto } from './dto/CollectionDto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly appService: CollectionCreator) { }

  @Post('generatecol')
  GetCollection(
    @Body() collection: CollectionDto) {
    return this.appService.createCollectionCall(collection);
  }
}