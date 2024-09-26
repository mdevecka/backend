import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, IsNull, Not } from 'typeorm';
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
    }).then(a => (a != null && a.image?.buffer != null) ? { image: a.image?.buffer, mimeType: a.image?.mimeType } : null);
  }

  async getArtworkThumbnail(userId: string, id: string) {
    return this.artworks.findOne({
      select: { id: true, thumbnail: { buffer: true, mimeType: true } },
      where: {
        id: id,
        artist: { userId: userId },
      }
    }).then(a => (a != null && a.thumbnail?.buffer != null) ? { image: a.thumbnail?.buffer, mimeType: a.thumbnail?.mimeType } : null);
  }

  async getArtworkUnityImage(userId: string, id: string) {
    return this.artworks.findOne({
      select: { id: true, unityImage: { buffer: true, mimeType: true } },
      where: {
        id: id,
        artist: { userId: userId },
      }
    }).then(a => (a != null && a.unityImage?.buffer != null) ? { image: a.unityImage?.buffer, mimeType: a.unityImage?.mimeType } : null);
  }

  async getUserAvatar(userId: string) {
    return this.users.findOne({
      select: { avatar: { buffer: true, mimeType: true } },
      where: {
        id: userId,
      }
    }).then(a => (a != null && a.avatar?.buffer != null) ? { image: a.avatar?.buffer, mimeType: a.avatar?.mimeType } : null);
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

  async getArtistLabels(userId: string) {
    return this.artists.find({ select: { label: true }, where: { userId: userId } }).then(list => list.map(a => a.label));
  }

  async getGalleryLabels(userId: string) {
    return this.galleries.find({ select: { label: true }, where: { userId: userId } }).then(list => list.map(a => a.label));
  }

  async getArtworkLabels(artistId: string) {
    return this.artworks.find({ select: { label: true }, where: { artistId: artistId } }).then(list => list.map(a => a.label));
  }

  async getExhibitionLabels(galleryId: string) {
    return this.exhibitions.find({ select: { label: true }, where: { galleryId: galleryId } }).then(list => list.map(a => a.label));
  }

  async userExists(id: string) {
    return this.users.existsBy({ id: id });
  }

  async countryExists(id: string) {
    return this.countries.existsBy({ id: id });
  }

  async artistCategoryExists(id: string) {
    return this.artistCategories.existsBy({ id: id });
  }

  async artworkGenreExists(id: string) {
    return this.artworkGenres.existsBy({ id: id });
  }

  async artworkWorktypeExists(id: string) {
    return this.artworkWorktypes.existsBy({ id: id });
  }

  async artworkMaterialExists(id: string) {
    return this.artworkMaterials.existsBy({ id: id });
  }

  async artworkTechniqueExists(id: string) {
    return this.artworkTechniques.existsBy({ id: id });
  }

  async itemTypeExists(id: string) {
    return this.unityItemTypes.existsBy({ id: id });
  }

  async getArtwork(userId: string, id: string) {
    return this.artworks.findOneBy({ id: id, artist: { userId: userId } });
  }

  async getExhibition(userId: string, id: string) {
    return this.exhibitions.findOneBy({ id: id, gallery: { userId: userId } });
  }

  async hasArtist(userId: string, id: string) {
    return this.artists.existsBy({ id: id, userId: userId });
  }

  async hasArtwork(userId: string, id: string) {
    return this.artworks.existsBy({ id: id, artist: { userId: userId } });
  }

  async artworkHasNft(id: string) {
    return this.artworks.existsBy({ id: id, nftId: Not(IsNull()) });
  }

  async hasGallery(userId: string, id: string) {
    return this.galleries.existsBy({ id: id, userId: userId });
  }

  async hasExhibition(userId: string, id: string) {
    return this.exhibitions.existsBy({ id: id, gallery: { userId: userId } });
  }

  async hasExhibitions(userId: string, ids: string[]) {
    const exhibitions = await this.exhibitions.find({ select: { id: true }, where: { gallery: { userId: userId } } });
    return ids.every(id => exhibitions.some(ex => ex.id === id));
  }

  async hasArtworks(userId: string, ids: string[]) {
    const artworks = await this.artworks.find({ select: { id: true }, where: { artist: { userId: userId } } });
    return ids.every(id => artworks.some(ex => ex.id === id));
  }

  async hasRoom(userId: string, id: string) {
    return this.unityRooms.existsBy({ id: id, exhibition: { gallery: { userId: userId } } });
  }

  async canUseRoomId(userId: string, id: string) {
    const room = await this.unityRooms.findOneBy({ id: id });
    if (room == null)
      return true;
    return this.hasRoom(userId, id);
  }

  async getArtistByName(userId: string, name: string) {
    return this.artists.findOneBy({ name: name, userId: userId });
  }

  async getGalleryByName(userId: string, name: string) {
    return this.galleries.findOneBy({ name: name, userId: userId });
  }

  async getArtworkByName(artistId: string, name: string) {
    return this.artworks.findOneBy({ name: name, artistId: artistId });
  }

  async getExhibitionByName(galleryId: string, name: string) {
    return this.exhibitions.findOneBy({ name: name, galleryId: galleryId });
  }

  async saveArtist(artist: DeepPartial<Artist>) {
    const entity = this.artists.create(artist);
    return this.artists.save(entity);
  }

  async removeArtist(id: string) {
    const entity = this.artists.create({ id: id });
    return this.artists.remove(entity);
  }

  async saveArtwork(artwork: DeepPartial<Artwork>) {
    const entity = this.artworks.create(artwork);
    return this.artworks.save(entity);
  }

  async removeArtwork(id: string) {
    const entity = this.artworks.create({ id: id });
    return this.artworks.remove(entity);
  }

  async saveGallery(gallery: DeepPartial<Gallery>) {
    const entity = this.galleries.create(gallery);
    return this.galleries.save(entity);
  }

  async removeGallery(id: string) {
    const entity = this.galleries.create({ id: id });
    return this.galleries.remove(entity);
  }

  async saveExhibition(exhibition: DeepPartial<Exhibition>) {
    const entity = this.exhibitions.create(exhibition);
    return this.exhibitions.save(entity);
  }

  async removeExhibition(id: string) {
    const entity = this.exhibitions.create({ id: id });
    return this.exhibitions.remove(entity);
  }

  async saveRoom(room: DeepPartial<UnityRoom>) {
    const entity = this.unityRooms.create(room);
    return this.unityRooms.save(entity);
  }

  async removeRoom(id: string) {
    const entity = this.unityRooms.create({ id: id });
    return this.unityRooms.remove(entity);
  }

}
