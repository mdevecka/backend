import { Controller, Post, Response, UseGuards, Body } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AuthService } from '@modules/auth/services';
import { SessionAuthGuard, SESSION_COOKIE, GetSessionId } from '@modules/auth/helpers';
import { LoginDto } from '../contracts/admin/login';

@Controller('admin')
export class AdminLoginController {

  constructor(private authService: AuthService) {
  }

  @Post('login')
  async login(@Body() login: LoginDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const sessionId = await this.authService.loginWithCredentials(login.email, login.password);
    res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true, secure: true, sameSite: "strict" });
    return { sessionId };
  }

  @UseGuards(SessionAuthGuard)
  @Post('logout')
  async logout(@GetSessionId() sessionId: string, @Response({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie(SESSION_COOKIE);
    await this.authService.logout(sessionId);
  }

}
