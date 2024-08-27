import { Module } from '@nestjs/common';
import { AppDbModule } from '@modules/.';
import { AuthService } from './services';

@Module({
  imports: [AppDbModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
