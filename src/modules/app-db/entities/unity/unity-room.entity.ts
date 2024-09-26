import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Exhibition } from '../exhibition.entity';
import { UnityWall } from './unity-wall.entity';
import { UnityLamp } from './unity-lamp.entity';
import { UnityItem } from './unity-item.entity';

@Entity()
export class UnityRoom extends BaseEntity {

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
  exhibitionId: string;

  @OneToMany(() => UnityWall, wall => wall.room, { cascade: ['insert', 'update'] })
  walls: UnityWall[];

  @OneToMany(() => UnityLamp, lamp => lamp.room, { cascade: ['insert', 'update'] })
  lamps: UnityLamp[];

  @OneToMany(() => UnityItem, item => item.room, { cascade: ['insert', 'update'] })
  items: UnityItem[];

}
