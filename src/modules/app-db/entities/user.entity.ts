import { Entity, Column, Index, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Wallet } from './wallet.entity';
import { Nft } from './nft.entity';

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

  @OneToOne(() => Nft, nft => nft.trialMintUser, { nullable: true }) // Add nullable to maintain current behavior
  @JoinColumn({ name: 'trialMint' }) // Ensure trialMint references Nft ID
  trialMint: Nft; // Modify type to Nft instead of string

  @Column('boolean', { default: false })
  trialMintClaimed: boolean;

  @Column('boolean', { default: false })
  trialMintPaid: boolean;

  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];
}
