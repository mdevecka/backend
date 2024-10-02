import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User, UserId } from './user.entity';
import { Nft } from './nft.entity';
import { Collection } from './collection.entity';
import { ID } from '@common/helpers';

export type WalletId = ID<"Wallet">;

@Entity()
export class Wallet extends BaseEntity {

  id: WalletId;

  @ManyToOne(() => User, user => user.wallets, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: UserId;

  @Column('text', { unique: true })
  walletAddress: string;

  @OneToMany(() => Collection, collection => collection.wallet)
  collections: Collection[];

  @OneToMany(() => Nft, nft => nft.wallet)
  nfts: Nft[];
}
