import { Controller, Body, Post, Req} from '@nestjs/common';
import { collectionCreator } from './collection.service';
import { CollectionDto } from './dto/CollectionDto';

@Controller()
export class CollectionController {
  constructor(private readonly appService: collectionCreator) {}

  @Post('generatecol')
  GetCollection(
    @Body() collection : CollectionDto,
    @Req() req: Request,){
    return this.appService.createCollectionCall(collection);
  }
}