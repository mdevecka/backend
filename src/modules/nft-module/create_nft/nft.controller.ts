import { Controller, Body, Put } from '@nestjs/common';
import { NftCreator } from './nft.service';
import { NftDto } from './dto/NFTDto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('nft')
export class NftController {
  constructor(private readonly appService: NftCreator) { }

  @Put('generatenft')
  @FormDataRequest()
  async formUpload(@Body() form: NftDto) {
    const { file, name, description, userId, address } = form;
    return this.appService.createNFTCall(file, name, description, userId, address);
  }
}