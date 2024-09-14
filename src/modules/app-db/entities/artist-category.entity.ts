import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class ArtistCategory extends BaseEntity {

  @Column('text')
  name: string;

}
