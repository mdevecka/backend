import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {

  @Get("healthyz")
  healthyz() {
    return;
  }

  @Get("readyz")
  readyz() {
    return;
  }

}
