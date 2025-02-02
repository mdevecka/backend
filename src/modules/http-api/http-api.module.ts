import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { HttpApiService } from './http-api.service';

@Module({
  imports: [HttpModule, JwtModule],
  providers: [HttpApiService],
  exports: [HttpApiService],
})
export class HttpApiModule { }
