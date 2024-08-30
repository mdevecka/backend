import { Entity, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Artist } from './artist.entity';
import { Exhibition } from './exhibition.entity';
import { ArtworkGenre } from './artwork-genre.entity';
import { ArtworkMaterial } from './artwork-material.entity';
import { ArtworkWorktype } from './artwork-worktype.entity';
import { ArtworkTechnique } from './artwork-technique.entity';
import { Nft } from './nft.entity';
import { Image } from './image';

@Entity()
export class Artwork extends LabeledEntity {

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Artist)
  artist: Artist;

  @Column(() => Image)
  image: Image;

  @Column(() => Image)
  thumbnail: Image;

  @Column('text')
  year: string;

  @Column({ type: 'boolean', default: false })
  ai: boolean;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @ManyToOne(() => ArtworkGenre)
  artworkGenre: ArtworkGenre;

  @ManyToOne(() => ArtworkMaterial)
  artworkMaterial: ArtworkMaterial;

  @ManyToOne(() => ArtworkTechnique)
  artworkTechnique: ArtworkTechnique;

  @ManyToOne(() => ArtworkWorktype)
  artworkWorktype: ArtworkWorktype;

  @ManyToMany(() => Exhibition, ex => ex.artworks)
  exhibitions: Exhibition[];

  @Column('text')
  measurements: string;

  @Column('integer')
  width: number;

  @Column('integer')
  height: number;

  @Column({ type: 'boolean', default: true })
  active: boolean

  @OneToOne(() => Nft, nft => nft.artwork, { nullable: true })
  @JoinColumn()
  nft: Nft;

  @Column('boolean', { default: true })
  isNft: boolean;
}
