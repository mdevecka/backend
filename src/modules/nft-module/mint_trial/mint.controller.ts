import { Controller, Put, UseGuards, BadRequestException, Param } from '@nestjs/common';
import { MintCreator } from './mint.service';
import { AuthGuard, UserId } from '@modules/auth/helpers';
import { FormDataRequest } from 'nestjs-form-data';

@UseGuards(AuthGuard)
@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) { }

  @Put('trial/artwork/:artworkId')
  @FormDataRequest()
  async formUpload(@Param("artworkId") artworkId: string, @UserId() userId: string): Promise<void> {
    const response = await this.appService.createMint(userId, artworkId);
    if (response === null) {
      throw new BadRequestException('An error occurred while updating database, please check your parameters');
    }
  }
}