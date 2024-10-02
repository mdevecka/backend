import { Entity, Column, Index, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Wallet } from './wallet.entity';
import { Nft } from './nft.entity';
import { Image } from './image';
import { ID } from '@common/helpers';

export type UserId = ID<"User">;

@Entity()
export class User extends LabeledEntity {

  id: UserId;

  @Index()
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  description: string;

  @Column(() => Image)
  avatar: Image;

  @OneToOne(() => Nft, nft => nft.user)
  @JoinColumn()
  trialMint: Nft;

  @Column('boolean', { default: false })
  trialMintClaimed: boolean;

  @Column('boolean', { default: false })
  trialMintPaid: boolean;

  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];
}
