import { Controller, Body, Post } from '@nestjs/common';
import { SwapCreator } from './swap.service';
import { SwapDto } from './dto/SwapDto';

@Controller('ownership')
export class SwapController {
  constructor(private readonly appService: SwapCreator) { }

  @Post('changeowner')
  GetCollection(
    @Body() swapData: SwapDto) {
    return this.appService.createSwapCall(swapData);
  }
}