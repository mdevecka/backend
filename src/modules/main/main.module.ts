import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule } from '@modules/.';
import { AdminLoginController, AdminReadController, AdminWriteController, PublicController } from './controllers';

@Module({
  imports: [AppDbModule, AuthModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController, PublicController],
  providers: [],
})
export class MainModule { }