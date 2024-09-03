import { Controller, Body, Put, Param } from '@nestjs/common';
import { CollectionCreator } from './collection.service';
import { CollectionDto } from './dto/CollectionDto';
import { FormDataRequest } from 'nestjs-form-data';
import { CollectionResponseDto } from './dto/CollectionResponseDto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly appService: CollectionCreator) { }

  @Put('create')
  @FormDataRequest()
  async formUpload(@Body() form: CollectionDto): Promise<CollectionResponseDto> {
    const { file, name, description, address, userID } = form;
    const callData = await this.appService.createCollectionCall(file, name, description, address, userID);
    return { callData };
  }

  @Put('updateDB/account/:accountAddress/collection/:collectionID')
  async UpdateDB(
    @Param("accountAddress") accountAddress: string,
    @Param("collectionID") collectionID: string ): Promise<void> {
    await this.appService.updateUserCollectionInDB(accountAddress, collectionID);
  }
}