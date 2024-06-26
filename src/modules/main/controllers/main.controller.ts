import { Controller, Get } from '@nestjs/common';
import { MainService } from '../services';
import { getEnv } from '@common/helpers';

@Controller('main')
export class MainController {

  constructor(private mainService: MainService) { }

  @Get()
  getHello(): string {
    return this.mainService.getHello();
  }

  @Get('env')
  getEnv() {
    return getEnv();
  }


}