import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Country } from './country.entity';
import { ArtistCategory } from './artist-category.entity';
import { User } from './user.entity';

@Entity()
export class Artist extends BaseEntity {

  @Column('text')
  name: string;

  @Column('date')
  born: Date;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @ManyToOne(() => Country)
  country: Country;

  @ManyToOne(() => ArtistCategory)
  artistCategory: ArtistCategory;

  @Column({ type: 'boolean', default: true })
  active: boolean

  @ManyToOne(() => User)
  user: User;

}
