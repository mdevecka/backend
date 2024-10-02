import { UserId } from '@modules/app-db/entities';

export interface UserDto {
  id: UserId;
  name: string;
  email: string;
  description: string;
}
