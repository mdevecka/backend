import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Country extends BaseEntity {

  @Column('text')
  name: string;

  @Column({ type: 'varchar', length: 10 })
  code: string;

}
