import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Gallery } from './gallery.entity';

@Entity()
export class Exhibition extends BaseEntity {

  @Column('text')
  name: string;

  @Column('date')
  fromDate: Date;

  @Column('date')
  toDate: Date;

  @Column('text')
  curator: string;

  @ManyToOne(() => Gallery)
  gallery: Gallery;

  @Column({ type: 'boolean', default: true })
  active: boolean;

}
