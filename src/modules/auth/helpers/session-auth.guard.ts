import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PublicToken } from './public.decorator';
import { AuthService } from '../services';
import { Request as ExpressRequest } from 'express';

export const SESSION_COOKIE = 'SESSION_ID';

export const SessionIdSymbol = Symbol("sessionId");
export const UserIdSymbol = Symbol("userId");

export interface RequestWithUserInfo extends ExpressRequest {
  [SessionIdSymbol]: string;
  [UserIdSymbol]: string;
}

@Injectable()
export class SessionAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublic(context))
      return true;
    const request = context.switchToHttp().getRequest<RequestWithUserInfo>();
    const sessionId = this.getSessionFromRequest(request);
    if (sessionId == null)
      throw new UnauthorizedException();
    const userId = await this.authService.getSessionUserId(sessionId);
    if (userId == null)
      throw new UnauthorizedException();
    await this.authService.refreshSession(sessionId, userId);
    request[SessionIdSymbol] = sessionId;
    request[UserIdSymbol] = userId;
    return true;
  }

  private getSessionFromRequest(req: ExpressRequest) {
    const authHeader = req.headers.authorization;
    const match = /^Bearer\s+(.*)$/.exec(authHeader);
    if (match != null)
      return match[1];
    return req.cookies[SESSION_COOKIE];
  }

  private isPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(PublicToken, [
      context.getHandler(),
      context.getClass(),
    ]) || false;
  }

}
