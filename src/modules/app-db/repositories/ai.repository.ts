import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import {
  Artwork, ArtworkImageId, AiMode
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

  async getArtworksForProcessing(count: number) {
    return this.artworks.find({
      select: {
        id: true,
        name: true,
        description: true,
        year: true,
        measurements: true,
        aiMode: true,
        aiProcessing: true,
        aiGeneratedStatus: true,
        image: { id: true, buffer: true, mimeType: true },
        artist: { name: true },
        artworkGenre: { name: true },
        artworkWorktype: { name: true },
        artworkMaterial: { name: true },
        artworkTechnique: { name: true },
      },
      relations: {
        artist: true,
        artworkGenre: true,
        artworkWorktype: true,
        artworkMaterial: true,
        artworkTechnique: true,
      },
      where: {
        protectedImage: { buffer: null },
        aiMode: AiMode.Automatic,
        aiProcessing: false,
      },
      take: count
    });
  }

  async saveArtwork(artwork: DeepPartial<Artwork>) {
    const entity = this.artworks.create(artwork);
    return this.artworks.save(entity);
  }

  async updateArtwork(artwork: Partial<Artwork>) {
    const entity = this.artworks.create(artwork);
    return this.artworks.update(artwork.id, entity);
  }

}
