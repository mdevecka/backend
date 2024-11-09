import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Artwork, ArtworkId } from '../artwork.entity';
import { UnityRoom } from './unity-room.entity';
import { UnityImage } from './unity-image.entity';
import { ID } from '@common/helpers';

export type UnityWallId = ID<"UnityWall">;

@Entity()
export class UnityWall extends BaseEntity {

  id: UnityWallId;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float')
  z: number;

  @Column('float')
  rotation: number;

  @Column('float')
  width: number;

  @Column('float')
  height: number;

  @Column('float')
  thick: number;

  @Column('text')
  color: string;

  @Column('float', { default: 1 })
  opacity: number;

  @ManyToOne(() => Artwork, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  artwork: Artwork;

  @Column({ nullable: true })
  artworkId: ArtworkId;

  @ManyToOne(() => UnityRoom, room => room.walls, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  room: UnityRoom;

  @OneToMany(() => UnityImage, image => image.wall, { cascade: ['insert', 'update'] })
  images: UnityImage[];

}
