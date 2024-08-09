import { Controller, Body, Post } from '@nestjs/common';
import { NftCreator } from './nft.service';
import { NftDto } from './dto/NFTDto';

@Controller('nft')
export class NftController {
  constructor(private readonly appService: NftCreator) { }

  @Post('generatenft')
  GetCollection(
    @Body() nft: NftDto) {
    return this.appService.createNFTCall(nft);
  }
}