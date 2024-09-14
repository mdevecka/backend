import { Controller, Body, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { NftCreator } from './nft.service';
import { NftDto } from './dto/NFTDto';
import { FormDataRequest } from 'nestjs-form-data';
import { NFTResponseDto } from './dto/NFTResponseDto';
import { AuthGuard, UserId } from '@modules/auth/helpers';

@UseGuards(AuthGuard)
@Controller('nft')
export class NftController {
  constructor(private readonly appService: NftCreator) { }

  @Put('create')
  @FormDataRequest()
  async formUpload(@Body() form: NftDto, @UserId() userId: string): Promise<NFTResponseDto> {
    const { file, name, metadata, address } = form;
    const callData = await this.appService.createNFTCall(file, name, metadata, address, userId);
    if (callData == null || callData == 'null') {
      throw new BadRequestException('An error occurred while creating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }

}