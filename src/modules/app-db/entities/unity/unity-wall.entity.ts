import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Artwork } from '../artwork.entity';
import { UnityRoom } from './unity-room.entity';
import { UnityImage } from './unity-image.entity';

@Entity()
export class UnityWall extends BaseEntity {

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

  @ManyToOne(() => Artwork)
  artwork: Artwork;

  @Column({ nullable: true })
  artworkId: string;

  @ManyToOne(() => UnityRoom, room => room.walls)
  room: UnityRoom;

  @OneToMany(() => UnityImage, image => image.wall)
  images: UnityImage[];

}
