import { Entity, Column, Index, OneToMany, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet } from './wallet.entity';
import { Nft, NftId } from './nft.entity';
import { Image } from './image';
import { ID } from '@common/helpers';
import slugify from 'slugify';

export type UserId = ID<"User">;

export enum LoginType {
  Credentials = 'credentials',
  Google = 'google',
}

export enum RegisterState {
  Registering = 'registering',
  Registered = 'registered',
}

@Entity()
export class User extends BaseEntity {

  id: UserId;

  @Column('text', { nullable: true })
  name: string;

  @Index()
  @Column('text', { nullable: true })
  label: string;

  @Column({ type: "enum", enum: LoginType, default: LoginType.Credentials })
  loginType: LoginType;

  @Index()
  @Column('text', { unique: true, nullable: true })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', { nullable: true })
  loginProviderId: string;

  @Column({ type: "enum", enum: RegisterState, default: RegisterState.Registering })
  registerState: RegisterState;

  @Column('text', { nullable: true })
  registerToken: string;

  @Column('text', { nullable: true })
  resetToken: string;

  @Column('text', { nullable: true })
  description: string;

  @Column(() => Image)
  avatar: Image;

  @OneToOne(() => Nft, nft => nft.user, { onDelete: 'SET NULL' })
  @JoinColumn()
  trialMint: Nft;

  @Column({ nullable: true })
  trialMintId: NftId;

  @Column('boolean', { default: false })
  trialMintClaimed: boolean;

  @Column('boolean', { default: false })
  trialMintPaid: boolean;

  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];

  @BeforeInsert()
  @BeforeUpdate()
  updateLabel() {
    if (this.name == null)
      return;
    this.label = slugify(this.name, { lower: true });
  }

}
