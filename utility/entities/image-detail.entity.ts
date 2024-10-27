import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, OneToOne, JoinColumn, AfterLoad, BeforeInsert, BeforeUpdate, Index } from 'typeorm';
import { Image } from './image.entity';
import { Artist } from './artist.entity';

@Entity('image_details')
export class ImageDetail {

  @PrimaryColumn({ name: "detail_id" })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  year: string;

  @Column({ type: 'text' })
  style: string;

  @Column({ type: 'text' })
  size: string;

  @JoinColumn()
  @OneToOne(() => Image)
  image: Image;

  @Column({ nullable: true })
  imageId: number;

  @ManyToOne(() => Artist)
  artist: Artist;

  @Column({ nullable: true })
  artistId: number;

}
