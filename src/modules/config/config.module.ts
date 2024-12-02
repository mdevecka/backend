import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { AppDbModule } from '@modules/app-db';


@Module({
  imports: [AppDbModule],
  controllers: [],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule { }