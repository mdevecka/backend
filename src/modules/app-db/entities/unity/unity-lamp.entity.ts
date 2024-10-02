import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UnityRoom } from './unity-room.entity';
import { ID } from '@common/helpers';

export type UnityLampId = ID<"UnityLamp">;

@Entity()
export class UnityLamp extends BaseEntity {

  id: UnityLampId;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float')
  z: number;

  @Column('float')
  range: number;

  @Column('boolean')
  shadow: boolean;

  @ManyToOne(() => UnityRoom, room => room.lamps, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  room: UnityRoom;

}
