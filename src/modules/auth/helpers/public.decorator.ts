import { SetMetadata } from '@nestjs/common';
import { Token } from '@common/helpers';

export const PublicToken = new Token("Public");
export const Public = () => SetMetadata(PublicToken, true);
