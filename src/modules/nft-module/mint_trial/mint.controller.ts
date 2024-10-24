import { Controller, Put, UseGuards, BadRequestException, Param } from '@nestjs/common';
import { MintCreator } from './mint.service';
import { SessionAuthGuard, GetUserId } from '@modules/auth/helpers';

@UseGuards(SessionAuthGuard)
@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) { }

  @Put('trial/artwork/:artworkId')
  async formUpload(@Param("artworkId") artworkId: string, @GetUserId() userId: string): Promise<void> {
    const response = await this.appService.createMint(userId, artworkId);
    if (response === null) {
      throw new BadRequestException('An error occurred while updating database, please check your parameters');
    }
  }
}