import { Controller, Get, Res, HttpStatus, Param, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard, UserId } from '@modules/auth/helpers';
import { MetaFetcher } from './meta.service';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('metadata')
export class MetaController {
  private readonly logger = new Logger(MetaController.name)

  constructor(private readonly appService: MetaFetcher) { }

  @Get('/nftmeta/address/:address')
  async getCollection(
    @Res() res: Response,
    @Param("address") address: string,
    @UserId() userId: string) {
    try {
      const data = await this.appService.fetchMetadata(userId, address);
      if (!data) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Couldnt save metadata',
        });
      }
      else {
        return res.status(HttpStatus.OK).json(data);
      }
    } catch (error) {
      this.logger.error(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while fetching metadata',
      });
    }
  }
}