import { Module } from '@nestjs/common';
import { AppDbModule } from '@modules/.';
import { AuthService, GoogleStrategy } from './services';

@Module({
  imports: [AppDbModule],
  controllers: [],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService, GoogleStrategy],
})
export class AuthModule { }
