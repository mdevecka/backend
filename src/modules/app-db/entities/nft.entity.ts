import { Entity, Column, ManyToOne, OneToOne, BeforeUpdate, BeforeInsert, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet, WalletId } from './wallet.entity';
import { Artwork } from './artwork.entity';
import { User } from './user.entity';
import { Collection, CollectionId } from './collection.entity';
import { ID } from '@common/helpers';
import slugify from 'slugify';

export type NftId = ID<"Nft">;

export interface NftData {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Entity()
export class Nft extends BaseEntity {

  id: NftId;

  @Index()
  @Column('text', { nullable: true })
  label: string;

  @OneToOne(() => Artwork, artwork => artwork.nft)
  artwork: Artwork;

  @ManyToOne(() => Wallet, wallet => wallet.nfts)
  wallet: Wallet;

  @Column({ nullable: true })
  walletId: WalletId;

  @Column({ type: 'jsonb', unique: true })
  nftData: NftData;

  @Column('text', { nullable: true })
  onlineCheck: string;

  @OneToOne(() => User, user => user.trialMint)
  user: User;

  @ManyToOne(() => Collection, collection => collection.nfts)
  collection: Collection;

  @Column({ nullable: true })
  collectionId: CollectionId;

  get canBeMinted() { return this.nftData.id[0] !== 'u' }

  get slug() { return `${this.wallet.user.label}/${this.label}`; }

  @BeforeInsert()
  @BeforeUpdate()
  updateLabel() {
    if (this.nftData?.name == null)
      return;
    this.label = slugify(this.nftData.name, { lower: true });
  }

}
