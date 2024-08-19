import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Artist } from './artist.entity';
import { Exhibition } from './exhibition.entity';
import { ArtworkGenre } from './artwork-genre.entity';
import { ArtworkMaterial } from './artwork-material.entity';
import { ArtworkWorktype } from './artwork-worktype.entity';
import { ArtworkTechnique } from './artwork-technique.entity';

@Entity()
export class Artwork extends LabeledEntity {

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Artist)
  artist: Artist;

  @Column({ type: "bytea" })
  image: Buffer;

  @Column({ type: "text" })
  imageMimeType: string;

  @Column('text')
  year: string;

  @Column({ type: 'boolean', default: false })
  nft: boolean; // todo replace by relationship

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

}
