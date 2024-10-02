import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ID } from '@common/helpers';

export type ArtworkWorktypeId = ID<"ArtworkWorktype">;

@Entity()
export class ArtworkWorktype extends BaseEntity {

  id: ArtworkWorktypeId;

  @Column('text')
  name: string;

}
