import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {

  constructor() { }

  getHello() {
    return 'Warp field stabilized!';
  }

}