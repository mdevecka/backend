import { PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastModifiedDate: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

}
