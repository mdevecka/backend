import { Entity, Column, ManyToOne } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Country } from './country.entity';
import { User } from './user.entity';

@Entity()
export class Gallery extends LabeledEntity {

  @Column('text')
  description: string;

  @Column('text')
  address: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column('text')
  gps: string;

  @Column({ type: 'boolean', default: true })
  public: boolean;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true })
  userId: string;

}
