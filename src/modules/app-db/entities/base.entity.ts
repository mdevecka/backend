import { PrimaryGeneratedColumn, Column, Generated, UpdateDateColumn, ManyToOne } from 'typeorm';
import type { User } from './user.entity';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated("uuid")
  uniqueId: string;

  @ManyToOne('User')
  lastModifiedBy: User;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastModifiedDate: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  label: string;

}
