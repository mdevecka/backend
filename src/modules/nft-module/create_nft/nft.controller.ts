import { Controller, Body, Put, UseGuards, BadRequestException, Param } from '@nestjs/common';
import { NftCreator } from './nft.service';
import { NftDto } from './dto/NFTDto';
import { NFTResponseDto } from './dto/NFTResponseDto';
import { SessionAuthGuard, GetUserId } from '@modules/auth/helpers';

@UseGuards(SessionAuthGuard)
@Controller('nft')
export class NftController {
  constructor(private readonly appService: NftCreator) { }

  @Put('create/collection/:collectionId/artwork/:artworkId')
  async nftCreate(@Param("collectionId") collectionId: string, @Param("artworkId") artworkId: string, @Body() form: NftDto, @GetUserId() userId: string): Promise<NFTResponseDto> {
    const { address } = form;
    const callData = await this.appService.createNFTCall(collectionId, artworkId, address, userId);
    if (callData == null) {
      throw new BadRequestException('An error occurred while creating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }

  @Put('update/artwork/:artworkId')
  async updateNft(@Param("artworkId") artworkId: string, @GetUserId() userId: string): Promise<NFTResponseDto> {
    const callData = await this.appService.updateNFTCall(artworkId, userId);
    if (callData == null) {
      throw new BadRequestException('An error occurred while updating nft call, please check your parameters');
    }
    else {
      return { callData }
    }
  }


}