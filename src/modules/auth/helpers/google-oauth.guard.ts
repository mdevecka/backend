import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {

  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const redirectUrl = request.query?.redirect_url;
    return { state: redirectUrl };
  }

}
