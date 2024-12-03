import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const token = this.getTokenFromRequest(request);
    if (token == null)
      throw new UnauthorizedException();
    try {
      await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private getTokenFromRequest(req: ExpressRequest) {
    const authHeader = req.headers.authorization;
    const match = /^Bearer\s+(.*)$/.exec(authHeader);
    return (match != null) ? match[1] : null;
  }

}
