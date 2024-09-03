import { Controller, Body, Put } from '@nestjs/common';
import { NftCreator } from './nft.service';
import { NftDto } from './dto/NFTDto';
import { FormDataRequest } from 'nestjs-form-data';
import { NFTResponseDto } from './dto/NFTResponseDto';

@Controller('nft')
export class NftController {
  constructor(private readonly appService: NftCreator) { }

  @Put('generatenft')
  @FormDataRequest()
  async formUpload(@Body() form: NftDto) : Promise<NFTResponseDto> {
    const { file, name, description, userId, address } = form;
    const callData = await this.appService.createNFTCall(file, name, description, userId, address);
    return { callData };
  }

}