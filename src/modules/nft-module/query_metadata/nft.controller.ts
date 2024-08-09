import { Controller, Body, Get, Req} from '@nestjs/common';
import { MetaFetcher } from './nft.service';
import { MetaDto } from './dto/MetaDto';

@Controller('metadata')
export class MetaController {
  constructor(private readonly appService: MetaFetcher) {}

  @Get('/nftmeta')
  GetCollection(
    @Body() account : MetaDto,
    @Req() req: Request,){
    return this.appService.fetchMetadata(account);
  }
}