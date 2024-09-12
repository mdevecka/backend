import { Controller, Body, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { MintCreator } from './mint.service';
import { AuthGuard, UserId } from '@modules/auth/helpers';
import { MintDto } from './dto/MintDto';
import { FormDataRequest } from 'nestjs-form-data';

@UseGuards(AuthGuard)
@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) { }

  @Put('trial')
  @FormDataRequest()
  async formUpload(@Body() form: MintDto, @UserId() userId: string): Promise<void> {
    const { file, name, metadata, artworkId } = form;
    const response = await this.appService.createMint(file, name, metadata, userId, artworkId);
    if (response === null) {
      throw new BadRequestException('An error occurred while updating database, please check your parameters');
    }
  }
}