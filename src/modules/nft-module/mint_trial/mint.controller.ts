import { Controller, Body, Post, Req} from '@nestjs/common';
import { MintCreator } from './mint.service';
import { MintDto } from './dto/MintDto';

@Controller()
export class MintController {
  constructor(private readonly appService: MintCreator) {}

  @Post('changeowner')
  GetCollection(
    @Body() imageData : MintDto,
    @Req() req: Request,){
    return this.appService.createMint(imageData);
  }
}