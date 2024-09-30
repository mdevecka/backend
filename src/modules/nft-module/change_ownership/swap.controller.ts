import { Controller, Body, Param, Put, BadRequestException, UseGuards, Get } from '@nestjs/common';
import { SwapCreator } from './swap.service';
import { SwapDto } from './dto/SwapDto';
import { SwapResponseDto } from './dto/SwapResponseDto';
import { AuthGuard, UserId } from '@modules/auth/helpers';

@UseGuards(AuthGuard)
@Controller('ownership')
export class SwapController {
  constructor(private readonly appService: SwapCreator) { }

  @Put('transfer/collection/:collectionID/asset/:assetID')
  async getSwapCall(
    @Body() swapData: SwapDto,
    @Param("collectionID") collectionID: string,
    @UserId() userId: string,
    @Param("assetID") assetID: string): Promise<SwapResponseDto> {
    const callData = await this.appService.createSwapCall(swapData, collectionID, assetID, userId);
    if (callData == null || callData == 'null') {
      throw new BadRequestException('An error occurred while creating swap call, please check your parameters');

    }
    else {
      return { callData }
    }
  }

  @Get('payment/ownership/:accountAddress')
  async getPayment(
    @Param("accountAddress") accountAddress: string, @UserId() userId: string,
  ): Promise<SwapResponseDto> {
    const callData = await this.appService.getPayCall(accountAddress, userId);
    if (callData === null) {
      throw new BadRequestException('An error occurred while updating database, please check your parameters');
    }
    return { callData }
  }

  @Put('updateDB/account/:accountAddress')
  async updateDB(
    @Param("accountAddress") accountAddress: string, @UserId() userId: string,
  ): Promise<void> {
    const response = await this.appService.swapNFTOwnershipInDB(accountAddress, userId);
    if (response === null) {
      throw new BadRequestException('An error occurred while updating database, please check your parameters');
    }
  }
}