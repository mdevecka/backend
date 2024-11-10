import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUserInfo, SessionIdSymbol } from './session-auth.guard';

export const GetSessionId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUserInfo>();
    return request[SessionIdSymbol];
  },
);
