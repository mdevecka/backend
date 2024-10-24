import { UserId, NftId } from '@modules/app-db/entities';

export interface UserDto {
  id: UserId;
  name: string;
  email: string;
  description: string;
  trialMintId: NftId;
  trialMintClaimed: boolean;
  trialMintPaid: boolean;
}
