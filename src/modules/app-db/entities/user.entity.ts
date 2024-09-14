import { Entity, Column, Index, OneToMany } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Wallet } from './wallet.entity';
import { Image } from './image';

@Entity()
export class User extends LabeledEntity {

  @Index()
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  description: string;

  @Column(() => Image)
  avatar: Image;

  @Column('text', { nullable: true })
  trialMint: string;

  @Column('boolean', { default: false })
  trialMintClaimed: boolean;

  @Column('text', { nullable: true })
  collectionID: string;

  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];

}
