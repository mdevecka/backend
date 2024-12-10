import { Module, Global } from '@nestjs/common';
import { AppConfigService } from './app-config.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule { }