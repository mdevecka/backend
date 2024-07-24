import { Column, Index, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from './base.entity';
import slugify from 'slugify';

export abstract class LabeledEntity extends BaseEntity {

  @Column('text')
  name: string;

  @Index()
  @Column('text')
  label: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateUniqueName() {
    this.label = slugify(this.name, { lower: true });
  }

}
