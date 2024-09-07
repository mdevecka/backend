import { Controller, Body, Put } from '@nestjs/common';
import { MintCreator } from './mint.service';
import { MintDto } from './dto/MintDto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) { }

  @Put('trial')
  @FormDataRequest()
  async formUpload(@Body() form: MintDto): Promise<void> {
    const { file, name, metadata, userId, artworkId } = form;
    await this.appService.createMint(file, name, metadata, userId, artworkId);
  }
}