import { Controller, Body, Post } from '@nestjs/common';
import { CollectionCreator } from './collection.service';
import { CollectionDto } from './dto/CollectionDto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('collection')
export class CollectionController {
  constructor(private readonly appService: CollectionCreator) { }

  @Post('collection')
  @FormDataRequest()
  async formUpload(@Body() form: CollectionDto) {
    const { file, name, description, address, userID } = form;
    return this.appService.createCollectionCall(file, name, description, address, userID);
  }
}