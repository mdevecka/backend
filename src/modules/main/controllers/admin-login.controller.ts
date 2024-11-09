import { Controller, Post, Response, UseGuards, Body } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AuthService } from '@modules/auth/services';
import { AuthGuard, SESSION_COOKIE, GetSessionId, Public } from '@modules/auth/helpers';
import { LoginDto } from '../contracts/admin/login';

@UseGuards(AuthGuard)
@Controller('admin')
export class AdminLoginController {

  constructor(private authService: AuthService) {
  }

  @Public()
  @Post('login')
  async login(@Body() login: LoginDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const sessionId = await this.authService.login(login.email, login.password);
    res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true, secure: true, sameSite: "strict" });
    return { sessionId };
  }

  @Post('logout')
  async logout(@GetSessionId() sessionId: string, @Response({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie(SESSION_COOKIE);
    await this.authService.logout(sessionId);
  }

}
