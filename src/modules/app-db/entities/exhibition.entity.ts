import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Gallery } from './gallery.entity';
import { Artwork } from './artwork.entity';

@Entity()
export class Exhibition extends LabeledEntity {

  @Column('timestamptz')
  fromDate: Date;

  @Column('timestamptz')
  toDate: Date;

  @Column('text')
  curator: string;

  @ManyToOne(() => Gallery)
  gallery: Gallery;

  @JoinTable()
  @ManyToMany(() => Artwork, art => art.exhibitions)
  artworks: Artwork[];

  @Column({ type: 'boolean', default: true })
  public: boolean;

}
