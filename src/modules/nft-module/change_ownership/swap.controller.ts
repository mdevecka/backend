import { Controller, Param, Put, BadRequestException, UseGuards, Get } from '@nestjs/common';
import { SwapCreator, SwapStatus } from './swap.service';
import { SwapResponseDto } from './dto/SwapResponseDto';
import { SessionAuthGuard, GetUserId } from '@modules/auth/helpers';

@UseGuards(SessionAuthGuard)
@Controller('ownership')
export class SwapController {
  constructor(private readonly appService: SwapCreator) { }

  @Put('transfer/asset/:assetID/account/:accountAddress')
  async getSwapCall(
    @Param("accountAddress") accountAddress: string, @GetUserId() userId: string,
    @Param("assetID") assetID: string): Promise<{status: SwapStatus}> {
    const callData = await this.appService.createSwapCall(accountAddress, assetID, userId);
    if (callData == SwapStatus.Failed) {
      throw new BadRequestException('An error occurred while creating swap call, please check your parameters');
    }
    else {
      return { status: SwapStatus.Success };
    }
  }

  @Get('payment/ownership/:accountAddress')
  async getPayment(
    @Param("accountAddress") accountAddress: string, @GetUserId() userId: string,
  ): Promise<SwapResponseDto> {
    const callData = await this.appService.getPayCall(accountAddress, userId);
    if (callData === null) {
      throw new BadRequestException('An error occurred while updating database, please check your parameters');
    }
    return { callData }
  }

  @Put('updateDB/account/:accountAddress')
  async updateDB(
    @Param("accountAddress") accountAddress: string, ): Promise<{ status: SwapStatus }> {
    const response = await this.appService.swapNFTOwnershipInDB(accountAddress);
    if (response === SwapStatus.Failed) {
      throw new BadRequestException('An error occurred while updating database, please check your parameters');
    }
    else {
      return { status: SwapStatus.Success };
    }
  }
}