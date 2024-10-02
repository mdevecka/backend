import { Entity, Column, ManyToOne, ManyToMany, JoinTable, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Gallery, GalleryId } from './gallery.entity';
import { Artwork } from './artwork.entity';
import { ID } from '@common/helpers';

export type ExhibitionId = ID<"Exhibition">;

@Entity()
@Index(['name', 'galleryId'], { unique: true })
@Index(['label', 'galleryId'], { unique: true })
export class Exhibition extends LabeledEntity {

  id: ExhibitionId;

  @Column('timestamptz')
  fromDate: Date;

  @Column('timestamptz')
  toDate: Date;

  @Column('text')
  curator: string;

  @ManyToOne(() => Gallery, { onDelete: 'CASCADE' })
  gallery: Gallery;

  @Column({ nullable: true })
  galleryId: GalleryId;

  @JoinTable()
  @ManyToMany(() => Artwork, art => art.exhibitions, { onDelete: 'CASCADE' })
  artworks: Artwork[];

  @Column({ type: 'boolean', default: true })
  public: boolean;

}
