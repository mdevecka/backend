import { Controller, Get, Param, Logger, UseGuards, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard, UserId } from '@modules/auth/helpers';
import { MetaFetcher } from './meta.service';

@UseGuards(AuthGuard)
@Controller('metadata')
export class MetaController {
  private readonly logger = new Logger(MetaController.name)

  constructor(private readonly appService: MetaFetcher) { }

  @Get('/nftmeta/address/:address')
  async getCollection(
    @Param("address") address: string,
    @UserId() userId: string) {
    try {
      const data = await this.appService.fetchMetadata(userId, address);
      if (!data) {
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