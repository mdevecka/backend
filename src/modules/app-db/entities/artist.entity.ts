import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Country, CountryId } from './country.entity';
import { ArtistCategory, ArtistCategoryId } from './artist-category.entity';
import { User, UserId } from './user.entity';
import { Image } from './image';
import { ID } from '@common/helpers';

export type ArtistId = ID<"Artist">;

@Entity()
@Index(['name', 'userId'], { unique: true })
@Index(['label', 'userId'], { unique: true })
export class Artist extends LabeledEntity {

  id: ArtistId;

  @Column('date', { nullable: true })
  born: string;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ type: 'text', nullable: true })
  facebookProfileLink: string;

  @Column({ type: 'text', nullable: true })
  instagramProfileLink: string;

  @Column({ type: 'text', nullable: true })
  xProfileLink: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ nullable: true })
  countryId: CountryId;

  @ManyToOne(() => ArtistCategory, { nullable: true })
  artistCategory: ArtistCategory;

  @Column({ nullable: true })
  artistCategoryId: ArtistCategoryId;

  @Column(() => Image)
  avatar: Image;

  @Column({ type: 'boolean', default: false })
  public: boolean

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: UserId;

  @Column('int', { nullable: true })
  importId: number;

  get slug() { return `${this.user.label}/${this.label}`; }

}
