import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ID } from '@common/helpers';

export type UnityItemTypeId = ID<"UnityItemType">;

@Entity()
export class UnityItemType extends BaseEntity {

  id: UnityItemTypeId;

  @Column("text")
  name: string;

}
