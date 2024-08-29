import { Controller, Body, Post, Param } from '@nestjs/common';
import { SwapCreator } from './swap.service';
import { SwapDto } from './dto/SwapDto';

@Controller('ownership')
export class SwapController {
  constructor(private readonly appService: SwapCreator) { }

  @Post('transfer/collection/:collectionID/asset/:assetID')
  GetCollection(
    @Body() swapData: SwapDto,
    @Param("collectionID") collectionID: string,
    @Param("assetID") assetID: string) {
    return this.appService.createSwapCall(swapData, collectionID, assetID);
  }
}