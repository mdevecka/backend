import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../entities';

@Injectable()
export class EvaGalleryRepository {

  constructor(
    @InjectRepository(Artist) private artists: Repository<Artist>,
  ) { }

  async getArtists() {
    return this.artists.find();
  }

  async createArtist(name: string, born: Date) {
    const artist = this.artists.create({
      name: name, born: born
    });
    return this.artists.save(artist);
  }

}
