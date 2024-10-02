import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Wallet } from './wallet.entity';
import { ID } from '@common/helpers';

export type CollectionId = ID<"Collection">;

export interface ColData {
  id: string;
  name: string;
  metadata: string;
  image: string;
}

@Entity()
export class Collection extends BaseEntity {

  id: CollectionId;

  @ManyToOne(() => Wallet, wallet => wallet.collections)
  wallet: Wallet;

  @Column({ type: 'jsonb', unique: true })
  colData: ColData;
}