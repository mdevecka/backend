import { Controller, Body, Post } from '@nestjs/common';
import { MintCreator } from './mint.service';
import { MintDto } from './dto/MintDto';

@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) { }

  @Post('trialmint')
  GetCollection(
    @Body() imageData: MintDto) {
    return this.appService.createMint(imageData);
  }
}