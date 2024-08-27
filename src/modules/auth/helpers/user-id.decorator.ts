import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUserInfo } from './auth.guard';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUserInfo>();
    return request.userId;
  },
);
