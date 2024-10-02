import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UnityRoom } from './unity-room.entity';
import { UnityItemType, UnityItemTypeId } from './unity-item-type.entity';
import { ID } from '@common/helpers';

export type UnityItemId = ID<"UnityItem">;

@Entity()
export class UnityItem extends BaseEntity {

  id: UnityItemId;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float')
  z: number;

  @Column('float')
  rotation: number;

  @ManyToOne(() => UnityItemType)
  itemType: UnityItemType;

  @Column({ nullable: true })
  itemTypeId: UnityItemTypeId;

  @ManyToOne(() => UnityRoom, room => room.items, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  room: UnityRoom;

}
