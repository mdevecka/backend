import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppDbModule, AuthModule } from '@modules/.';
import { AdminLoginController, AdminReadController, AdminWriteController } from './controllers';

@Module({
  imports: [AppDbModule, AuthModule, NestjsFormDataModule],
  controllers: [AdminLoginController, AdminReadController, AdminWriteController],
  providers: [],
})
export class MainModule { }