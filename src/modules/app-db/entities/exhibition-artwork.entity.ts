import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Artwork } from './artwork.entity';
import { Exhibition } from './exhibition.entity';

@Entity()
export class ExhibitionArtwork extends BaseEntity {

  @ManyToOne(() => Exhibition)
  exhibition: Exhibition;

  @ManyToOne(() => Artwork)
  artwork: Artwork;

}
