import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Nft } from './nft.entity';

@Entity()
export class Wallet extends BaseEntity {

  @ManyToOne(() => User, user => user.wallets)
  user: User;

  @Column('text', { unique: true })
  walletAddress: string;

  @OneToMany(() => Nft, nft => nft.wallet)
  nfts: Nft[];
}
