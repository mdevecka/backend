import { Entity, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToOne, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Gallery, GalleryId } from './gallery.entity';
import { Artwork } from './artwork.entity';
import { UnityRoom, UnityRoomId } from './unity';
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

  @Column('text', { nullable: true })
  curator: string;

  @ManyToOne(() => Gallery, { onDelete: 'CASCADE' })
  gallery: Gallery;

  @Column({ nullable: true })
  galleryId: GalleryId;

  @JoinTable()
  @ManyToMany(() => Artwork, art => art.exhibitions, { onDelete: 'CASCADE' })
  artworks: Artwork[];

  @JoinColumn()
  @OneToOne(() => UnityRoom)
  activeRoom: UnityRoom;

  @Column({ nullable: true })
  activeRoomId: UnityRoomId;

  @Column({ type: 'boolean', default: false })
  public: boolean;

}
