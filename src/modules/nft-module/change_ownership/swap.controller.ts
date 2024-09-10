import { Controller, Body, Param, Put, UseGuards } from '@nestjs/common';
import { SwapCreator } from './swap.service';
import { SwapDto } from './dto/SwapDto';
import { SwapResponseDto } from './dto/SwapResponseDto';
import { AuthGuard } from '@modules/auth/helpers';

@UseGuards(AuthGuard)
@Controller('ownership')
export class SwapController {
  constructor(private readonly appService: SwapCreator) { }

  @Put('transfer/collection/:collectionID/asset/:assetID')
  async getSwapCall(
    @Body() swapData: SwapDto,
    @Param("collectionID") collectionID: string,
    @Param("assetID") assetID: string): Promise<SwapResponseDto> {
    const callData = await this.appService.createSwapCall(swapData, collectionID, assetID);
    return { callData };
  }

  @Put('updateDB/account/:accountAddress')
  async updateDB(
    @Param("accountAddress") accountAddress: string,): Promise<void> {
    await this.appService.swapNFTOwnershipInDB(accountAddress);
  }
}