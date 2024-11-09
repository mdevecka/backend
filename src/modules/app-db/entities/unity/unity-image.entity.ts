import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Artwork, ArtworkId } from '../artwork.entity';
import { UnityWall } from './unity-wall.entity';
import { ID } from '@common/helpers';

export type UnityImageId = ID<"UnityImage">;

@Entity()
export class UnityImage extends BaseEntity {

  id: UnityImageId;

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float')
  scale: number;

  @ManyToOne(() => Artwork, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  artwork: Artwork;

  @Column({ nullable: true })
  artworkId: ArtworkId;

  @ManyToOne(() => UnityWall, wall => wall.images, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  wall: UnityWall;

}
