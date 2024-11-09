import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, AfterLoad, BeforeInsert, BeforeUpdate, Index } from 'typeorm';
import { Image } from './image.entity';

@Entity('artists')
export class Artist {

  @PrimaryColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  artistType: string;

  @Column({ type: 'text' })
  bio: string;

  @OneToMany(() => Image, image => image.artist)
  images: Image[];

  equals(artist: Artist) {
    return (this.name === artist.name && this.country === artist.country &&
      this.email === artist.email && this.artistType === artist.artistType &&
      this.bio === artist.bio);
  }

}
