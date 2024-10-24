import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUserInfo, UserIdSymbol } from './session-auth.guard';

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUserInfo>();
    return request[UserIdSymbol];
  },
);
