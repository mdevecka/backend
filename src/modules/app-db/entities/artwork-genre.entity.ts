import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ID } from '@common/helpers';

export type ArtworkGenreId = ID<"ArtworkGenre">;

@Entity()
export class ArtworkGenre extends BaseEntity {

  id: ArtworkGenreId;

  @Column('text')
  name: string;

}
