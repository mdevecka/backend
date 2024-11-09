import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Exhibition, ExhibitionId } from '../exhibition.entity';
import { Resource, ResourceId } from '../resource.entity';
import { UnityWall } from './unity-wall.entity';
import { UnityLamp } from './unity-lamp.entity';
import { UnityItem } from './unity-item.entity';
import { ID } from '@common/helpers';

export type UnityRoomId = ID<"UnityRoom">;

@Entity()
export class UnityRoom extends BaseEntity {

  id: UnityRoomId;

  @Column('text')
  name: string;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float')
  width: number;

  @Column('float')
  height: number;

  @Column('float')
  length: number;

  @ManyToOne(() => Exhibition, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  exhibition: Exhibition;

  @Column({ nullable: true })
  exhibitionId: ExhibitionId;

  @OneToMany(() => UnityWall, wall => wall.room, { cascade: ['insert', 'update'] })
  walls: UnityWall[];

  @OneToMany(() => UnityLamp, lamp => lamp.room, { cascade: ['insert', 'update'] })
  lamps: UnityLamp[];

  @OneToMany(() => UnityItem, item => item.room, { cascade: ['insert', 'update'] })
  items: UnityItem[];

  @ManyToOne(() => Resource, { onDelete: 'SET NULL' })
  environmentImage: Resource;

  @Column({ nullable: true })
  environmentImageId: ResourceId;

  @ManyToOne(() => Resource, { onDelete: 'SET NULL' })
  backgroundMusic: Resource;

  @Column({ nullable: true })
  backgroundMusicId: ResourceId;

}
