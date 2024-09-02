import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { MetaFetcher } from './meta.service';
import { Response } from 'express';

@Controller('metadata')
export class MetaController {
  constructor(private readonly appService: MetaFetcher) { }

  @Get('/nftmeta/userID/:userID/address/:address')
  async getCollection(
    @Res() res: Response,
    @Param("userID") userId: string,
    @Param("address") address: string) {
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
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        message: 'An error occurred while fetching metadata',
        error: error.message,
      });
    }
  }
}