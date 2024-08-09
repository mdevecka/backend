import { Entity, Column } from 'typeorm';
import { LabeledEntity } from './labeled.entity';

@Entity()
export class User extends LabeledEntity {

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  description: string;

  @Column({ type: "bytea", nullable: true })
  avatar: Buffer;

  @Column({ type: 'text', nullable: true })
  avatarUrlTemp: string;

  @Column('int')
  trialMint: number;
}
