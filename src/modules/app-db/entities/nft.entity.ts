import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet } from './wallet.entity';
import { Artwork } from './artwork.entity';

@Entity()
export class Nft extends BaseEntity {

  @OneToOne(() => Artwork, artwork => artwork.nft)
  @JoinColumn()
  artwork: Artwork;

  @ManyToOne(() => Wallet, wallet => wallet.nfts)
  wallet: Wallet;

  @Column({ type: 'jsonb', unique: true })
  nftData: JSON;
}