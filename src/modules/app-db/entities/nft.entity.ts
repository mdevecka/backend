import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Nft extends BaseEntity {

    // Many NFTs belong to one user
    @ManyToOne(() => User, user => user.nfts)
    user: User;

    @Column({ type: 'json', unique: true })
    nftData: JSON;
}