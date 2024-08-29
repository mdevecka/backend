import { Controller, Body, Post } from '@nestjs/common';
import { MintCreator } from './mint.service';
import { MintDto } from './dto/MintDto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) { }

  @Post('trialmint')
  @FormDataRequest()
  async formUpload(@Body() form: MintDto) {
    const { file, name, description, userId } = form;
    return this.appService.createMint(file, name, description, userId);
  }
}