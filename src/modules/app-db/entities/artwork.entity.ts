import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Artist } from './artist.entity';
import { Exhibition } from './exhibition.entity';
import { ArtworkGenre } from './artwork-genre.entity';
import { ArtworkMaterial } from './artwork-material.entity';
import { ArtworkWorktype } from './artwork-worktype.entity';
import { ArtworkTechnique } from './artwork-technique.entity';
import { ArtworkCategory } from './artwork-category.entity';

@Entity()
export class Artwork extends LabeledEntity {

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Artist)
  artist: Artist;

  @Column({ type: "bytea", nullable: true })
  image: Buffer;

  @Column({ type: 'text', nullable: true })
  imageUrlTemp: string;

  @Column('text')
  year: string;

  @ManyToOne(() => ArtworkGenre)
  artworkGenre: ArtworkGenre;

  @ManyToOne(() => ArtworkWorktype)
  artworkWorktype: ArtworkWorktype;

  @ManyToOne(() => ArtworkCategory)
  artworkCategory: ArtworkCategory;

  @ManyToOne(() => ArtworkMaterial)
  artworkMaterial: ArtworkMaterial;

  @ManyToOne(() => ArtworkTechnique)
  artworkTechnique: ArtworkTechnique;

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
