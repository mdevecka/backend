import { Entity, Column, Index, OneToMany, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet } from './wallet.entity';
import { Nft, NftId } from './nft.entity';
import { Image } from './image';
import { ID } from '@common/helpers';
import slugify from 'slugify';

export type UserId = ID<"User">;

@Entity()
export class User extends BaseEntity {

  id: UserId;

  @Column('text', { nullable: true })
  name: string;

  @Index()
  @Column('text')
  label: string;

  @Index()
  @Column('text', { unique: true, nullable: true })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', { nullable: true })
  description: string;

  @Column(() => Image)
  avatar: Image;

  @OneToOne(() => Nft, nft => nft.user)
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
