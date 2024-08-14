import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Nft } from './nft.entity';

@Entity()
export class Wallet extends BaseEntity {

    @ManyToOne(() => User, user => user.wallets)
    user: User;

    @OneToMany(() => Nft, nft => nft.wallet)
    nfts: Nft[];
}
