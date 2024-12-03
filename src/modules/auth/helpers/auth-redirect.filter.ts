import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AppConfig } from '@common/config';
import { urlCombine } from '@common/helpers';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthRedirectFilter implements ExceptionFilter {

  constructor(private config: ConfigService<AppConfig>) {
  }

  catch(exception: UnauthorizedException | ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.redirect(urlCombine(this.config.get("FRONTEND_URL"), this.config.get("AUTH_FAILURE_ROUTE")));
  }

}
