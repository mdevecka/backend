import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Country, CountryId } from './country.entity';
import { User, UserId } from './user.entity';
import { ID } from '@common/helpers';

export type GalleryId = ID<"Gallery">;

@Entity()
@Index(['name', 'userId'], { unique: true })
@Index(['label', 'userId'], { unique: true })
export class Gallery extends LabeledEntity {

  id: GalleryId;

  @Column('text')
  description: string;

  @Column('text')
  address: string;

  @ManyToOne(() => Country)
  country: Country;

  @Column({ nullable: true })
  countryId: CountryId;

  @Column('text')
  gps: string;

  @Column({ type: 'boolean', default: true })
  public: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  userId: UserId;

}
