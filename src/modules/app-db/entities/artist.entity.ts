import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Country } from './country.entity';
import { ArtistCategory } from './artist-category.entity';
import { User } from './user.entity';

@Entity()
@Index(['name', 'userId'], { unique: true })
@Index(['label', 'userId'], { unique: true })
export class Artist extends LabeledEntity {

  @Column('date')
  born: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ nullable: true })
  countryId: string;

  @ManyToOne(() => ArtistCategory)
  artistCategory: ArtistCategory;

  @Column({ nullable: true })
  artistCategoryId: string;

  @Column({ type: 'boolean', default: true })
  public: boolean

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: string;

}
