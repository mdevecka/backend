import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule, MailModule, HttpApiModule } from '@modules/.';
import { AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController } from './controllers';
import { NftConfigModule } from '@modules/config';

@Module({
  imports: [AppDbModule, AuthModule, MailModule, NftConfigModule, HttpApiModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController, PublicController, HealthCheckController, AiController],
})
export class MainModule { }