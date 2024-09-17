import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User, Artist, Artwork, Gallery, Exhibition, Country, ArtistCategory, ArtworkTechnique,
  ArtworkMaterial, ArtworkGenre, ArtworkWorktype, UnityRoom, UnityItemType, Nft
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
    @InjectRepository(UnityRoom) private unityRooms: Repository<UnityRoom>,
    @InjectRepository(UnityItemType) private unityItemTypes: Repository<UnityItemType>,
    @InjectRepository(Nft) private nfts: Repository<Nft>,
  ) { }

  async getUsers() {
    return this.users.find();
  }

  async getUser(id: string) {
    return this.users.findOne({
      where: {
        id: id,
      }
    });
  }

  async getUserByEmail(email: string) {
    return this.users.findOne({
      where: {
        email: email,
      }
    });
  }

  async getArtists(userId: string) {
    return this.artists.find({
      relations: {
        country: true,
        artistCategory: true,
      },
      where: { userId: userId }
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
      where: { artist: { userId: userId } }
    });
  }

  async getGalleries(userId: string) {
    return this.galleries.find({
      relations: {
        user: true,
        country: true,
      },
      where: { userId: userId }
    });
  }

  async getExhibitions(userId: string) {
    return this.exhibitions.find({
      relations: {
        gallery: true,
      },
      where: { gallery: { userId: userId } }
    });
  }

  async getRooms(userId: string) {
    return this.unityRooms.find({
      relations: {
        exhibition: { gallery: true },
      },
      where: {
        exhibition: {
          gallery: { userId: userId },
        }
      }
    });
  }

  async getRoomExhibitionInfo(userId: string, id: string) {
    return this.unityRooms.findOne({
      select: {
        id: true,
        exhibition: {
          id: true,
          name: true,
          gallery: {
            id: true,
            name: true,
          }
        }
      },
      relations: {
        exhibition: { gallery: true }
      },
      where: {
        id: id,
        exhibition: {
          gallery: { userId: userId },
        }
      }
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
        userId: userId,
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
        artist: { userId: userId },
      }
    });
  }

  async getGalleryDetail(userId: string, id: string) {
    return this.galleries.findOne({
      relations: {
        country: true,
      },
      where: {
        id: id,
        userId: userId,
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
        gallery: { userId: userId }
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
        gallery: { userId: userId },
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
        artist: { userId: userId },
      }
    });
  }

  async getExhibitionRooms(userId: string, id: string) {
    return this.unityRooms.find({
      where: {
        exhibition: {
          id: id,
          gallery: { userId: userId },
        }
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
          userId: userId
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
          userId: userId
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
        userId: userId,
      }
    });
  }

  async getArtistOptions(userId: string) {
    return this.artists.find({
      select: { id: true, name: true },
      where: {
        userId: userId,
      }
    });
  }

  async getArtworkOptions(userId: string) {
    return this.artworks.find({
      select: { id: true, name: true },
      where: {
        artist: { userId: userId },
      }
    });
  }

  async getExhibitionOptions(userId: string) {
    return this.exhibitions.find({
      select: { id: true, name: true },
      where: {
        gallery: { userId: userId },
      }
    });
  }

  async getArtworkImage(userId: string, id: string) {
    return this.artworks.findOne({
      select: { id: true, image: { buffer: true, mimeType: true } },
      where: {
        id: id,
        artist: { userId: userId },
      }
    }).then(a => (a != null) ? { image: a.image?.buffer, mimeType: a.image?.mimeType } : null);
  }

  async getArtworkThumbnail(userId: string, id: string) {
    return this.artworks.findOne({
      select: { id: true, thumbnail: { buffer: true, mimeType: true } },
      where: {
        id: id,
        artist: { userId: userId },
      }
    }).then(a => (a != null) ? { image: a.thumbnail?.buffer, mimeType: a.thumbnail?.mimeType } : null);
  }

  async getArtworkUnityImage(userId: string, id: string) {
    return this.artworks.findOne({
      select: { id: true, unityImage: { buffer: true, mimeType: true } },
      where: {
        id: id,
        artist: { userId: userId },
      }
    }).then(a => (a != null) ? { image: a.unityImage?.buffer, mimeType: a.unityImage?.mimeType } : null);
  }

  async getUserAvatar(userId: string) {
    return this.users.findOne({
      select: { avatar: { buffer: true, mimeType: true } },
      where: {
        id: userId,
      }
    }).then(a => (a != null) ? { image: a.avatar?.buffer, mimeType: a.avatar?.mimeType } : null);
  }

  async getDesignerRoom(userId: string, id: string) {
    return this.unityRooms.findOne({
      relations: {
        walls: { images: true },
        lamps: true,
        items: true,
      },
      where: {
        id: id,
        exhibition: {
          gallery: { userId: userId },
        }
      }
    });
  }

  async getItemTypes() {
    return this.unityItemTypes.find();
  }

  async getNfts(userId: string) {
    return this.nfts.find({
      relations: {
        artwork: true,
      },
      where: {
        wallet: { userId: userId }
      }
    });
  }

  async getNftDetail(userId: string, id: string) {
    return this.nfts.findOne({
      relations: {
        artwork: true,
      },
      where: {
        id: id,
        wallet: { userId: userId }
      }
    });
  }

}
