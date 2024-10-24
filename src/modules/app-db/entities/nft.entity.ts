import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet, WalletId } from './wallet.entity';
import { Artwork } from './artwork.entity';
import { User } from './user.entity';
import { Collection, CollectionId } from './collection.entity';
import { ID } from '@common/helpers';

export type NftId = ID<"Nft">;

export interface NftData {
  id: string;
  name: string;
  metadata: string;
  image: string;
}

@Entity()
export class Nft extends BaseEntity {

  id: NftId;

  @OneToOne(() => Artwork, artwork => artwork.nft)
  artwork: Artwork;

  @ManyToOne(() => Wallet, wallet => wallet.nfts)
  wallet: Wallet;

  @Column({ nullable: true })
  walletId: WalletId;

  @Column({ type: 'jsonb', unique: true })
  nftData: NftData;

  @OneToOne(() => User, user => user.trialMint)
  user: User;

  @ManyToOne(() => Collection, collection => collection.nfts)
  collection: Collection;

  @Column({ nullable: true })
  collectionId: CollectionId;

  get canBeMinted() { return this.nftData.id[0] !== 'u' }

}
