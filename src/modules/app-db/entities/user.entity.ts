import { Entity, Column, Index, OneToMany } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Nft } from './nft.entity';
import { Wallet } from './wallet.entity';

@Entity()
export class User extends LabeledEntity {

  @Index()
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  description: string;

  @Column({ type: "bytea" })
  avatar: Buffer;

  @Column({ type: 'text', nullable: true })
  avatarUrlTemp: string;

  @Column('text')
  trialMint: string;

  @Column('boolean')
  trialMintClaimed: boolean;

  @Column('text')
  collectionID: string;

  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];
}
