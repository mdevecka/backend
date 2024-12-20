import { UserId, NftId, LoginType } from '@modules/app-db/entities';

export interface UserDto {
  id: UserId;
  name: string;
  email: string;
  description: string;
  loginType: LoginType;
  trialMintId: NftId;
  trialMintClaimed: boolean;
  trialMintPaid: boolean;
}
