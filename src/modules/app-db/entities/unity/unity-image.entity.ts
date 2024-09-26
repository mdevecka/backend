import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Artwork } from '../artwork.entity';
import { UnityWall } from './unity-wall.entity';

@Entity()
export class UnityImage extends BaseEntity {

  @Column('float')
  x: number;

  @Column('float')
  y: number;

  @Column('float')
  scale: number;

  @ManyToOne(() => Artwork, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  artwork: Artwork;

  @Column({ nullable: true })
  artworkId: string;

  @ManyToOne(() => UnityWall, wall => wall.images, { onDelete: 'CASCADE', orphanedRowAction: "delete" })
  wall: UnityWall;

}
