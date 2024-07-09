import { Controller, Get, Post, Body } from '@nestjs/common';
import { MainService } from '../services';
import { EvaGalleryRepository } from '@modules/app-db/repositories';
import { CreateArtistRequest, GetArtistsResponse } from '../contracts';
import { getEnv } from '@common/helpers';

@Controller('main')
export class MainController {

  constructor(private mainService: MainService, private evaGalleryRepository: EvaGalleryRepository) { }

  @Get()
  getHello(): string {
    return this.mainService.getHello();
  }

  @Get('env')
  getEnv() {
    return getEnv();
  }

  @Get('artists')
  async getArtists(): Promise<GetArtistsResponse> {
    return this.evaGalleryRepository.getArtists().then(list => list.map(a => ({ name: a.name, born: a.born })));
  }

  @Post('artist/create')
  async createArtist(@Body() req: CreateArtistRequest) {
    await this.evaGalleryRepository.createArtist(req.name, req.born);
  }

}
