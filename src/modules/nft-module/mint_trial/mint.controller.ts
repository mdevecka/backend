import { Controller, Put, UseGuards, Param } from '@nestjs/common';
import { MintStatus } from './mint.service';
import { MintCreator } from './mint.service';
import { SessionAuthGuard, GetUserId } from '@modules/auth/helpers';

@UseGuards(SessionAuthGuard)
@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) { }

  @Put('trial/artwork/:artworkId')
  async formUpload(@Param("artworkId") artworkId: string, @GetUserId() userId: string): Promise<{ status: MintStatus }> {
    const response = await this.appService.createMint(userId, artworkId);
    if (response === MintStatus.MintedAlready) {
      return { status: MintStatus.MintedAlready };
    } else if (response === null) {
      return { status: MintStatus.Failed };
    } else {
      return { status: MintStatus.Success };
    }
  }
} 