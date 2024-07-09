import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {

  @Column('text')
  email: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'char', length: 250 })
  avatar: string;

}
