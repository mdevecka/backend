import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet } from './wallet.entity';
import { Artwork } from './artwork.entity';

export interface NftData {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Entity()
export class Nft extends BaseEntity {

  @OneToOne(() => Artwork, artwork => artwork.nft)
  artwork: Artwork;

  @ManyToOne(() => Wallet, wallet => wallet.nfts)
  wallet: Wallet;

  @Column({ type: 'json', unique: true })
  nftData: NftData;
}