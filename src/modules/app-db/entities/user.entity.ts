import { Entity, Column, Index, OneToMany } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
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

  @Column({ type: "bytea", nullable: true })
  avatar: Buffer;

  @Column({ type: 'text', nullable: true })
  avatarUrlTemp: string;

  @Column('text', { nullable: true })
  trialMint: string;

  @Column('boolean', { default: false })
  trialMintClaimed: boolean;

  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];
}
