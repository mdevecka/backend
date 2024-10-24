import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, OneToOne, JoinColumn, AfterLoad, BeforeInsert, BeforeUpdate, Index } from 'typeorm';
import { Artist } from './artist.entity';

@Entity('images')
export class Image {

  @PrimaryColumn()
  id: number;

  @Column({ type: 'text' })
  fileName: string;

  @Column({ type: 'text' })
  filePath: string;

  @ManyToOne(() => Artist, artist => artist.images)
  artist: Artist;

  @Column({ nullable: true })
  artistId: number;

}
