import { Entity, Column, ManyToOne } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Country } from './country.entity';
import { User } from './user.entity';

@Entity()
export class Gallery extends LabeledEntity {

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

  @Column('text')
  gps: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => User)
  user: User;

}
