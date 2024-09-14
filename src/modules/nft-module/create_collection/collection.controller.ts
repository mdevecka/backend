import { Controller, Body, Put, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { CollectionCreator } from './collection.service';
import { CollectionDto } from './dto/CollectionDto';
import { FormDataRequest } from 'nestjs-form-data';
import { CollectionResponseDto } from './dto/CollectionResponseDto';
import { AuthGuard, UserId } from '@modules/auth/helpers';

@UseGuards(AuthGuard)
@Controller('collection')
export class CollectionController {
  constructor(private readonly appService: CollectionCreator) { }

  @Put('create')
  @FormDataRequest()
  async formUpload(@Body() form: CollectionDto, @UserId() userId: string): Promise<CollectionResponseDto> {
    const { file, name, metadata, address } = form;
    const callData = await this.appService.createCollectionCall(file, name, metadata, address, userId);
    if (callData == null || callData == 'null') {
      throw new BadRequestException('An error occurred while creating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }

  @Put('updateDB/collection/:collectionID')
  async updateDB(
    @UserId() userId: string,
    @Param("collectionID") collectionID: string): Promise<void> {
    await this.appService.updateUserCollectionInDB(userId, collectionID);
  }
}