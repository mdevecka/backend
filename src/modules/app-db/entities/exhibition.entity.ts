import { Entity, Column, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Gallery } from './gallery.entity';
import { Artwork } from './artwork.entity';

@Entity()
@Index(['name', 'galleryId'], { unique: true })
@Index(['label', 'galleryId'], { unique: true })
export class Exhibition extends LabeledEntity {

  @Column('timestamptz')
  fromDate: Date;

  @Column('timestamptz')
  toDate: Date;

  @Column('text')
  curator: string;

  @ManyToOne(() => Gallery, { onDelete: 'CASCADE' })
  gallery: Gallery;

  @Column({ nullable: true })
  galleryId: string;

  @JoinTable()
  @ManyToMany(() => Artwork, art => art.exhibitions, { onDelete: 'CASCADE' })
  artworks: Artwork[];

  @Column({ type: 'boolean', default: true })
  public: boolean;

}
