import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ID } from '@common/helpers';

export type ArtworkTechniqueId = ID<"ArtworkTechnique">;

@Entity()
export class ArtworkTechnique extends BaseEntity {

  id: ArtworkTechniqueId;

  @Column('text')
  name: string;

}
