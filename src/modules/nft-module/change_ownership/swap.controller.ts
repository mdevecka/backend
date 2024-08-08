import { Controller, Body, Post, Req} from '@nestjs/common';
import { SwapCreator } from './swap.service';
import { SwapDto } from './dto/SwapDto';

@Controller()
export class SwapController {
  constructor(private readonly appService: SwapCreator) {}

  @Post('changeowner')
  GetCollection(
    @Body() swapData : SwapDto,
    @Req() req: Request,){
    return this.appService.createSwapCall(swapData);
  }
}