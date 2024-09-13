import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UnityRoom } from './unity-room.entity';
import { UnityItemType } from './unity-item-type.entity';

@Entity()
export class UnityItem extends BaseEntity {

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
  itemTypeId: string;

  @ManyToOne(() => UnityRoom, room => room.items)
  room: UnityRoom;

}
