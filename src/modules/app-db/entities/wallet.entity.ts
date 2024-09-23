import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Nft } from './nft.entity';
import { Collection } from './collection.entity';

@Entity()
export class Wallet extends BaseEntity {

  @ManyToOne(() => User, user => user.wallets)
  user: User;

  @Column('text', { unique: true })
  walletAddress: string;

  @OneToMany(() => Collection, collection => collection.wallet)
  collections: Collection[];

  @OneToMany(() => Nft, nft => nft.wallet)
  nfts: Nft[];
}
