import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ID } from '@common/helpers';

export type ArtworkMaterialId = ID<"ArtworkMaterial">;

@Entity()
export class ArtworkMaterial extends BaseEntity {

  id: ArtworkMaterialId;

  @Column('text')
  name: string;

}
