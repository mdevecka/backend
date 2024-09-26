import { SetMetadata } from '@nestjs/common';

export const PublicToken = Symbol("Public");
export const Public = () => SetMetadata(PublicToken, true);
