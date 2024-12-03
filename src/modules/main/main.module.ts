import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule, MailModule, HttpApiModule } from '@modules/.';
import { AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController } from './controllers';
import { AppConfigModule } from '@modules/config/config.module';

@Module({
  imports: [AppDbModule, AuthModule, MailModule, AppConfigModule, HttpApiModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController],
})
export class MainModule { }