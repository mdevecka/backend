import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User, Artist, Artwork, Gallery, Exhibition, Country, ArtistCategory, ArtworkTechnique,
  ArtworkMaterial, ArtworkGenre, ArtworkWorktype
} from '../entities';

@Injectable()
export class AdminRepository {

  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Artist) private artists: Repository<Artist>,
    @InjectRepository(Artwork) private artworks: Repository<Artwork>,
    @InjectRepository(Gallery) private galleries: Repository<Gallery>,
    @InjectRepository(Exhibition) private exhibitions: Repository<Exhibition>,
    @InjectRepository(Country) private countries: Repository<Country>,
    @InjectRepository(ArtistCategory) private artistCategories: Repository<ArtistCategory>,
    @InjectRepository(ArtworkTechnique) private artworkTechniques: Repository<ArtworkTechnique>,
    @InjectRepository(ArtworkMaterial) private artworkMaterials: Repository<ArtworkMaterial>,
    @InjectRepository(ArtworkGenre) private artworkGenres: Repository<ArtworkGenre>,
    @InjectRepository(ArtworkWorktype) private artworkWorktypes: Repository<ArtworkWorktype>,
  ) { }

  async getUsers() {
    return this.users.find();
  }

  async getArtists(userId: string) {
    return this.artists.find({
      relations: {
        country: true,
        artistCategory: true,
      },
      where: { user: { id: userId } }
    });
  }

  async getArtworks(userId: string) {
    return this.artworks.find({
      relations: {
        artist: true,
        artworkGenre: true,
        artworkWorktype: true,
        artworkMaterial: true,
        artworkTechnique: true,
      },
      where: { artist: { user: { id: userId } } }
    });
  }

  async getGalleries(userId: string) {
    return this.galleries.find({
      relations: {
        user: true,
        country: true,
      },
      where: { user: { id: userId } }
    });
  }

  async getExhibitions(userId: string) {
    return this.exhibitions.find({
      relations: {
        gallery: true,
      },
      where: { gallery: { user: { id: userId } } }
    });
  }

  async getArtistDetail(userId: string, id: string) {
    return this.artists.findOne({
      relations: {
        country: true,
        artistCategory: true,
      },
      where: {
        id: id,
        user: { id: userId }
      }
    });
  }

  async getArtworkDetail(userId: string, id: string) {
    return this.artworks.findOne({
      relations: {
        artist: true,
        artworkGenre: true,
        artworkWorktype: true,
        artworkMaterial: true,
        artworkTechnique: true,
      },
      where: {
        id: id,
        artist: { user: { id: userId } },
      }
    });
  }

  async getGalleryDetail(userId: string, id: string) {
    return this.galleries.findOne({
      relations: {
        user: true,
        country: true,
      },
      where: {
        id: id,
        user: { id: userId }
      }
    });
  }

  async getExhibitionDetail(userId: string, id: string) {
    return this.exhibitions.findOne({
      relations: {
        gallery: true,
      },
      where: {
        id: id,
        gallery: { user: { id: userId } }
      }
    });
  }

  async getArtworkExhibitions(userId: string, id: string) {
    return this.exhibitions.find({
      relations: {
        gallery: true,
      },
      where: {
        artworks: {
          id: id
        },
        gallery: { user: { id: userId } },
      }
    });
  }

  async getExhibitionArtworks(userId: string, id: string) {
    return this.artworks.find({
      relations: {
        artist: true,
        artworkGenre: true,
        artworkWorktype: true,
        artworkMaterial: true,
        artworkTechnique: true,
      },
      where: {
        exhibitions: {
          id: id
        },
        artist: { user: { id: userId } },
      }
    });
  }

  async getGalleryExhibitions(userId: string, id: string) {
    return this.exhibitions.find({
      relations: {
        gallery: true,
      },
      where: {
        gallery: {
          id: id,
          user: { id: userId }
        },
      }
    });
  }

  async getArtistArtworks(userId: string, id: string) {
    return this.artworks.find({
      relations: {
        artist: true,
        artworkGenre: true,
        artworkWorktype: true,
        artworkMaterial: true,
        artworkTechnique: true,
      },
      where: {
        artist: {
          id: id,
          user: { id: userId }
        },
      }
    });
  }

  async getCountryOptions() {
    return this.countries.find({
      select: { id: true, name: true, code: true },
    });
  }

  async getArtistCategoryOptions() {
    return this.artistCategories.find({
      select: { id: true, name: true },
    });
  }

  async getArtworkTechniqueOptions() {
    return this.artworkTechniques.find({
      select: { id: true, name: true },
    });
  }

  async getArtworkGenreOptions() {
    return this.artworkGenres.find({
      select: { id: true, name: true },
    });
  }

  async getArtworkWorktypeOptions() {
    return this.artworkWorktypes.find({
      select: { id: true, name: true },
    });
  }

  async getArtworkMaterialOptions() {
    return this.artworkMaterials.find({
      select: { id: true, name: true },
    });
  }

  async getGalleryOptions(userId: string) {
    return this.galleries.find({
      select: { id: true, name: true },
      where: {
        user: { id: userId },
      }
    });
  }

  async getArtistOptions(userId: string) {
    return this.artists.find({
      select: { id: true, name: true },
      where: {
        user: { id: userId },
      }
    });
  }

  async getArtworkOptions(userId: string) {
    return this.artworks.find({
      select: { id: true, name: true },
      where: {
        artist: { user: { id: userId } },
      }
    });
  }

  async getExhibitionOptions(userId: string) {
    return this.exhibitions.find({
      select: { id: true, name: true },
      where: {
        gallery: { user: { id: userId } },
      }
    });
  }

  async getArtworkImage(userId: string, id: string) {
    return this.artworks.findOne({
      select: { id: true, image: true },
      where: {
        id: id,
        artist: { user: { id: userId } },
      }
    }).then(a => a?.image);
  }

}
