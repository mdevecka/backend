import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule, MailModule } from '@modules/.';
import { AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController } from './controllers';

@Module({
  imports: [AppDbModule, AuthModule, MailModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController],
  providers: [],
})
export class MainModule { }