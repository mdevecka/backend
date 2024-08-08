import { Controller, Body, Post, Req} from '@nestjs/common';
import { nftCreator } from './nft.service';
import { NftDto } from './dto/NFTDto';

@Controller()
export class NftController {
  constructor(private readonly appService: nftCreator) {}

  @Post('generatenft')
  GetCollection(
    @Body() nft : NftDto,
    @Req() req: Request,){
    return this.appService.createNFTCall(nft);
  }
}