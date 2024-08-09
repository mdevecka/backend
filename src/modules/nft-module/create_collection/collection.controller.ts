import { Controller, Body, Post, Req} from '@nestjs/common';
import { CollectionCreator } from './collection.service';
import { CollectionDto } from './dto/CollectionDto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly appService: CollectionCreator) {}

  @Post('generatecol')
  GetCollection(
    @Body() collection : CollectionDto,
    @Req() req: Request,){
    return this.appService.createCollectionCall(collection);
  }
}