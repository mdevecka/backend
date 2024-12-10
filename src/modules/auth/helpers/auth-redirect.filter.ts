import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Response } from 'express';
import { AppConfigService } from '@modules/config/app-config.service';
import { urlCombine } from '@common/helpers';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthRedirectFilter implements ExceptionFilter {

  constructor(private config: AppConfigService) {
  }

  catch(exception: UnauthorizedException | ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.redirect(urlCombine(this.config.frontendUrl, this.config.authFailureRoute));
  }

}
