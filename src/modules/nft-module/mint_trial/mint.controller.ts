import { Controller, Body, Post, Req} from '@nestjs/common';
import { MintCreator } from './mint.service';
import { MintDto } from './dto/MintDto';

@Controller('mint')
export class MintController {
  constructor(private readonly appService: MintCreator) {}

  @Post('trialmint')
  GetCollection(
    @Body() imageData : MintDto,
    @Req() req: Request,){
    return this.appService.createMint(imageData);
  }
}