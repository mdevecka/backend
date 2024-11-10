import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet, WalletId } from './wallet.entity';
import { Nft } from './nft.entity';
import { ID } from '@common/helpers';

export type CollectionId = ID<"Collection">;

export interface ColData {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Entity()
export class Collection extends BaseEntity {

  id: CollectionId;

  @ManyToOne(() => Wallet, wallet => wallet.collections)
  wallet: Wallet;

  @Column({ nullable: true })
  walletId: WalletId;

  @Column({ type: 'jsonb', unique: true })
  colData: ColData;

  @Column('text', { nullable: true })
  onlineCheck: string;

  //Connect with NFT entity one collection can have multiple NFTs
  @OneToMany(() => Nft, nft => nft.collection)
  nfts: Nft[];

  get canBeMinted() { return this.colData.id[0] !== 'u' }

}
