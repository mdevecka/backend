import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Country } from './country.entity';
import { User } from './user.entity';

@Entity()
export class Gallery extends BaseEntity {

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  street: string;

  @Column('text')
  city: string;

  @Column('text')
  postcode: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ type: 'varchar', length: 255 })
  gps: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => User)
  user: User;

}
