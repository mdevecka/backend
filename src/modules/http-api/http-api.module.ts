import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpApiService } from './http-api.service';

@Module({
  imports: [HttpModule],
  providers: [HttpApiService],
  exports: [HttpApiService],
})
export class HttpApiModule { }
