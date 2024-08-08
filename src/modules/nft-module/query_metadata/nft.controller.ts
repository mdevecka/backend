import { Controller, Body, Get, Req} from '@nestjs/common';
import { metaFetcher } from './nft.service';
import { MetaDto } from './dto/MetaDto';

@Controller()
export class MetaController {
  constructor(private readonly appService: metaFetcher) {}

  @Get('/nftmeta')
  GetCollection(
    @Body() account : MetaDto,
    @Req() req: Request,){
    return this.appService.fetchMetadata(account);
  }
}