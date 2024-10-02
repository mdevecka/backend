import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ID } from '@common/helpers';

export type ArtistCategoryId = ID<"ArtistCategory">;

@Entity()
export class ArtistCategory extends BaseEntity {

  id: ArtistCategoryId;

  @Column('text')
  name: string;

}
