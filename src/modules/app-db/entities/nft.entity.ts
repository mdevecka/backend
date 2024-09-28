import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet } from './wallet.entity';
import { Artwork } from './artwork.entity';
import { User } from './user.entity';

export interface NftData {
  id: string;
  name: string;
  metadata: string;
  image: string;
}

@Entity()
export class Nft extends BaseEntity {

  @OneToOne(() => Artwork, artwork => artwork.nft)
  artwork: Artwork;

  @ManyToOne(() => Wallet, wallet => wallet.nfts)
  wallet: Wallet;

  @Column({ type: 'jsonb', unique: true })
  nftData: NftData;

  // Define the inverse one-to-one relationship with User
  @OneToOne(() => User, user => user.trialMint)
  user: User;
}