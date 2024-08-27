import { Entity, Column, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';

@Entity()
export class User extends LabeledEntity {

  @Index()
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  description: string;

  @Column({ type: "bytea" })
  avatar: Buffer;

}
