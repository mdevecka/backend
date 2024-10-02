import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Country, CountryId } from './country.entity';
import { ArtistCategory, ArtistCategoryId } from './artist-category.entity';
import { User, UserId } from './user.entity';
import { ID } from '@common/helpers';

export type ArtistId = ID<"Artist">;

@Entity()
@Index(['name', 'userId'], { unique: true })
@Index(['label', 'userId'], { unique: true })
export class Artist extends LabeledEntity {

  id: ArtistId;

  @Column('date')
  born: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ nullable: true })
  countryId: CountryId;

  @ManyToOne(() => ArtistCategory)
  artistCategory: ArtistCategory;

  @Column({ nullable: true })
  artistCategoryId: ArtistCategoryId;

  @Column({ type: 'boolean', default: true })
  public: boolean

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: UserId;

}
