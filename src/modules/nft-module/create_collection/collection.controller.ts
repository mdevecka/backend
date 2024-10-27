import { Controller, Body, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { CollectionCreator } from './collection.service';
import { CollectionDto } from './dto/CollectionDto';
import { FormDataRequest } from 'nestjs-form-data';
import { CollectionResponseDto } from './dto/CollectionResponseDto';
import { SessionAuthGuard } from '@modules/auth/helpers';

@UseGuards(SessionAuthGuard)
@Controller('collection')
export class CollectionController {
  constructor(private readonly appService: CollectionCreator) { }

  @Put('create')
  @FormDataRequest()
  async formUpload(@Body() form: CollectionDto): Promise<CollectionResponseDto> {
    const { file, name, metadata, address } = form;
    const callData = await this.appService.createCollectionCall(file, name, metadata, address);
    if (callData == null || callData == 'null') {
      throw new BadRequestException('An error occurred while creating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }
}