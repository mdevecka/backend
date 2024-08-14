import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet } from './wallet.entity';

@Entity()
export class Nft extends BaseEntity {

    @ManyToOne(() => Wallet, wallet => wallet.nfts)
    wallet: Wallet;

    @Column({ type: 'json', unique: true })
    nftData: JSON;
}