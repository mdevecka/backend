import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Artist } from './artist.entity';
import { ArtworkGenre } from './artwork-genre.entity';
import { ArtworkMaterial } from './artwork-material.entity';
import { ArtworkWorktype } from './artwork-worktype.entity';
import { ArtworkTechnique } from './artwork-technique.entity';

export enum ArtworkCategory {
  EaselPainting = 'easel painting',
}

@Entity()
export class Artwork extends BaseEntity {

  @Column('text')
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Artist)
  artist: Artist;

  @Column({ type: 'char', length: 250 })
  image: string;

  @Column('text')
  year: string;

  @ManyToOne(() => ArtworkGenre)
  artworkGenre: ArtworkGenre;

  @ManyToOne(() => ArtworkWorktype)
  artworkWorktype: ArtworkWorktype;

  @Column({ type: "enum", enum: ArtworkCategory })
  artworkCategory: ArtworkCategory;

  @ManyToOne(() => ArtworkMaterial)
  artworkMaterial: ArtworkMaterial;

  @ManyToOne(() => ArtworkTechnique)
  artworkTechnique: ArtworkTechnique;

  @Column('text')
  measurements: string;

  @Column('integer')
  width: number;

  @Column('integer')
  height: number;

  @Column({ type: 'boolean', default: true })
  active: boolean

}
