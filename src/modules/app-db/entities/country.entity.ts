import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Country extends BaseEntity {

  @Column('text')
  name: string;

  @Column({ type: 'char', length: 2 })
  code: string;

}
