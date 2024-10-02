import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ID } from '@common/helpers';

export type CountryId = ID<"Country">;

@Entity()
export class Country extends BaseEntity {

  id: CountryId;

  @Column('text')
  name: string;

  @Column({ type: 'char', length: 2 })
  code: string;

}
