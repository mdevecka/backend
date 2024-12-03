import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule, MailModule } from '@modules/.';
import { AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController } from './controllers';
import { AppConfigModule } from '@modules/config/config.module';

@Module({
  imports: [AppDbModule, AuthModule, MailModule, AppConfigModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController],
  providers: [],
})
export class MainModule { }