import { Controller, Get, Post, Patch, Request, Response, Redirect, UseGuards, UseFilters, Body, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthService, GoogleUser } from '@modules/auth/services';
import { SessionAuthGuard, GoogleOauthGuard, AuthRedirectFilter, SESSION_COOKIE, GetSessionId, GetUserId } from '@modules/auth/helpers';
import { MailService } from '@modules/mail';
import { AdminRepository } from '@modules/app-db/repositories';
import { LoginType, RegisterState, Image, UserId } from '@modules/app-db/entities';
import { LoginDto, CreateUserDto, RegisterUserDto, ChangeUserDto, ChangePasswordDto, RequestPasswordResetDto, ResetPasswordDto } from '../contracts/admin/login';
import { registerUserSubject, registerUserBody, resetUserSubject, resetUserBody } from '../templates';
import { AppConfig } from '@common/config';
import { urlCombine, mapEmpty } from '@common/helpers';
import { randomBytes } from 'crypto';
import { hash, compare } from 'bcrypt';

@Controller('admin')
export class AdminLoginController {

  constructor(private config: ConfigService<AppConfig>, private authService: AuthService, private mailService: MailService, private adminRepository: AdminRepository) {
  }

  @Post('login')
  async login(@Body() login: LoginDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const sessionId = await this.authService.loginWithCredentials(login.email, login.password);
    res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true, secure: true, sameSite: "strict" });
  }

  @UseGuards(GoogleOauthGuard)
  @Get('google/login')
  async googleLogin() { }

  @UseGuards(GoogleOauthGuard)
  @UseFilters(AuthRedirectFilter)
  @Get('google/login/callback')
  @Redirect()
  async googleLoginCallback(@Request() req: ExpressRequest & { user: GoogleUser }, @Response({ passthrough: true }) res: ExpressResponse) {
    return this.providerLoginCallback(LoginType.Google, req, res);
  }

  @Post('user/register')
  @FormDataRequest()
  async registerUser(@Body() dto: RegisterUserDto) {
    const user = await this.adminRepository.getUserByEmail(dto.email, LoginType.Credentials);
    if (user != null && user.registerState !== RegisterState.Registering)
      throw new BadRequestException("user already registered");
    const token = randomBytes(6).toString('base64');
    this.adminRepository.saveUser({
      id: (user != null) ? user.id : undefined,
      loginType: LoginType.Credentials,
      email: dto.email.toLowerCase(),
      registerState: RegisterState.Registering,
      registerToken: token,
    });
    const redirectUrl = urlCombine(this.config.get("FRONTEND_URL"), this.config.get("AUTH_CREATE_USER_ROUTE"));
    const url = `${redirectUrl}?token=${encodeURIComponent(token)}&loginType=${encodeURIComponent(LoginType.Credentials)}`;
    await this.mailService.send(dto.email, registerUserSubject(), registerUserBody(url));
  }

  @Post('user/create')
  @FormDataRequest()
  async createUser(@Body() dto: CreateUserDto, @Response({ passthrough: true }) res: ExpressResponse) {
    const user = await this.adminRepository.getUserByRegisterToken(dto.token);
    if (user == null)
      throw new NotFoundException();
    if (user.registerState === RegisterState.Registered)
      throw new BadRequestException("user already registered");
    if (user.loginType === LoginType.Credentials) {
      if (dto.password == null)
        throw new BadRequestException("missing password");
      user.password = await this.hashPassword(dto.password);
    }
    user.name = dto.name;
    user.description = dto.description;
    user.avatar = mapEmpty(dto.avatar, image => ({ buffer: image.buffer, mimeType: image.mimeType }), Image.empty);
    user.registerState = RegisterState.Registered;
    user.registerToken = null;
    await this.adminRepository.saveUser(user);
    const sessionId = (user.loginType === LoginType.Credentials) ?
      await this.authService.loginWithCredentials(user.email, dto.password) :
      await this.authService.loginWithProvider(user.loginProviderId, user.loginType);
    res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true, secure: true, sameSite: "strict" });
  }

  @UseGuards(SessionAuthGuard)
  @Patch('user/change-profile')
  @FormDataRequest()
  async changeUserProfile(@Body() dto: ChangeUserDto, @GetUserId() userId: UserId) {
    await this.adminRepository.saveUser({
      id: userId,
      name: dto.name,
      description: dto.description,
      avatar: mapEmpty(dto.avatar, image => ({ buffer: image.buffer, mimeType: image.mimeType }), Image.empty),
    });
  }

  @UseGuards(SessionAuthGuard)
  @Post('user/change-password')
  @FormDataRequest()
  async changeUserPassword(@Body() dto: ChangePasswordDto, @GetUserId() userId: UserId) {
    const user = await this.adminRepository.getUser(userId);
    const validPassword = await compare(dto.oldPassword, user.password);
    if (!validPassword)
      throw new UnauthorizedException();
    await this.adminRepository.saveUser({
      id: userId,
      password: await this.hashPassword(dto.newPassword)
    });
  }

  @Post('user/request-password-reset')
  @FormDataRequest()
  async requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    const user = await this.adminRepository.getUserByEmail(dto.email, LoginType.Credentials);
    if (user == null || user.registerState === RegisterState.Registering)
      throw new NotFoundException();
    const token = randomBytes(6).toString('base64');
    this.adminRepository.saveUser({
      id: user.id,
      resetToken: token,
    });
    const redirectUrl = urlCombine(this.config.get("FRONTEND_URL"), this.config.get("AUTH_RESET_USER_ROUTE"));
    const url = `${redirectUrl}?token=${encodeURIComponent(token)}`;
    await this.mailService.send(dto.email, resetUserSubject(), resetUserBody(url));
  }

  @Post('user/reset-password')
  @FormDataRequest()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const user = await this.adminRepository.getUserByResetToken(dto.token);
    if (user == null)
      throw new NotFoundException();
    if (user.loginType !== LoginType.Credentials || user.registerState !== RegisterState.Registered)
      throw new BadRequestException("invalid user");
    user.password = await this.hashPassword(dto.password);
    user.resetToken = null;
    await this.adminRepository.saveUser(user);
  }

  @UseGuards(SessionAuthGuard)
  @Post('logout')
  async logout(@GetSessionId() sessionId: string, @Response({ passthrough: true }) res: ExpressResponse) {
    res.clearCookie(SESSION_COOKIE);
    await this.authService.logout(sessionId);
  }

  private async providerLoginCallback(loginType: LoginType, req: ExpressRequest & { user: { id: string, name: string } }, res: ExpressResponse) {
    const user = await this.adminRepository.getUserByProviderId(req.user.id, loginType);
    if (user == null || user.registerState === RegisterState.Registering) {
      const token = randomBytes(6).toString('base64');
      this.adminRepository.saveUser({
        id: (user != null) ? user.id : undefined,
        loginType: loginType,
        loginProviderId: req.user.id,
        registerState: RegisterState.Registering,
        registerToken: token,
      });
      const redirectUrl = urlCombine(this.config.get("FRONTEND_URL"), this.config.get("AUTH_CREATE_USER_ROUTE"));
      const name = req.user.name ?? "";
      return { url: `${redirectUrl}?token=${encodeURIComponent(token)}&name=${encodeURIComponent(name)}&loginType=${encodeURIComponent(loginType)}` };
    }
    const sessionId = await this.authService.loginWithProvider(req.user.id, loginType);
    res.cookie(SESSION_COOKIE, sessionId, { httpOnly: true, secure: true, sameSite: "strict" });
    const redirectRoute = (req.query.state as string) ?? "";
    const redirectUrl = urlCombine(this.config.get("FRONTEND_URL"), redirectRoute);
    return { url: redirectUrl };
  }

  private async hashPassword(password: string) {
    const SALT_ROUNDS = 10;
    return await hash(password, SALT_ROUNDS);
  }

}