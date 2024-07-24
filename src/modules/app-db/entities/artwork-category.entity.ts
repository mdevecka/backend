import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class ArtworkCategory extends BaseEntity {

  @Column('text')
  name: string;

}
