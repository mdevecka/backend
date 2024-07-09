import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class ArtworkWorktype extends BaseEntity {

  @Column('text')
  name: string;

}
