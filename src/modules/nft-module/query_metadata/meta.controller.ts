import { Controller, Get, Param, UseGuards, Logger, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard, GetUserId } from '@modules/auth/helpers';
import { MetaFetcher } from './meta.service';

@UseGuards(AuthGuard)
@Controller('metadata')
export class MetaController {
  private readonly logger = new Logger(MetaController.name)

  constructor(private readonly appService: MetaFetcher) { }

  @Get('/nftmeta/address/:address')
  async getNFTMeta(
    @Param("address") address: string,
    @GetUserId() userId: string) {
    try {
      const data = await this.appService.fetchNFTMetadata(userId, address);
      if (data == null) {
        throw new BadRequestException('An error occurred while fetching metadata, please check your parameters');
      }
      else {
        return data;
      }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('An internal server error occurred while fetching metadata.');
    }
  }


  @Get('/colmeta/address/:address')
  async getColMeta(
    @Param("address") address: string,
    @GetUserId() userId: string) {
    try {
      const data = await this.appService.fetchColMetadata(userId, address);
      if (data == null) {
        throw new BadRequestException('An error occurred while fetching metadata, please check your parameters');
      }
      else {
        return data;
      }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('An internal server error occurred while fetching metadata.');
    }
  }
}