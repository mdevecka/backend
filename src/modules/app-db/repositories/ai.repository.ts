import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import {
  Artwork, ArtworkImageId
} from '../entities';

@Injectable()
export class AiRepository {

  constructor(@InjectRepository(Artwork) private artworks: Repository<Artwork>) { }

  async getArtworkByImageId(id: ArtworkImageId) {
    return this.artworks.findOne({
      relations: {
        artist: true,
        artworkGenre: true,
        artworkMaterial: true,
        artworkTechnique: true,
        artworkWorktype: true
      },
      where: { image: { id: id } }
    });
  }

  async saveArtwork(artwork: DeepPartial<Artwork>) {
    const entity = this.artworks.create(artwork);
    return this.artworks.save(entity);
  }

}
