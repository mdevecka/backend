import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Artist, Artwork, Gallery, Exhibition, Nft, Resource, UnityRoom, UnityItemType,
  ArtworkId, ResourceId, UnityRoomId,
} from '../entities';

export const MAX_SEED = 2 ** 32;

@Injectable()
export class PublicRepository {

  constructor(
    @InjectRepository(Artist) private artists: Repository<Artist>,
    @InjectRepository(Artwork) private artworks: Repository<Artwork>,
    @InjectRepository(Gallery) private galleries: Repository<Gallery>,
    @InjectRepository(Exhibition) private exhibitions: Repository<Exhibition>,
    @InjectRepository(Nft) private nfts: Repository<Nft>,
    @InjectRepository(UnityRoom) private unityRooms: Repository<UnityRoom>,
    @InjectRepository(UnityItemType) private unityItemTypes: Repository<UnityItemType>,
    @InjectRepository(Resource) private resources: Repository<Resource>,
  ) { }

  async getRandomArtists(seed: number, from: number = 0, count: number = 1) {
    const nseed = seed / MAX_SEED;
    return this.artists.manager.transaction(async mgr => {
      await mgr.query(`SELECT setseed(${nseed})`);
      return await mgr.getRepository(Artist).createQueryBuilder("artist")
        .innerJoinAndSelect("artist.user", "user")
        .innerJoinAndSelect("artist.country", "country")
        .orderBy("random()")
        .where("artist.public = true")
        .offset(from)
        .limit(count)
        .getMany();
    });
  }

  async getRandomArtworks(seed: number, from: number = 0, count: number = 1) {
    const nseed = seed / MAX_SEED;
    return this.artworks.manager.transaction(async mgr => {
      await mgr.query(`SELECT setseed(${nseed})`);
      return await mgr.getRepository(Artwork).createQueryBuilder("artwork")
        .innerJoinAndSelect("artwork.artist", "artist")
        .innerJoinAndSelect("artist.user", "user")
        .orderBy("random()")
        .where("artwork.public = true")
        .where("artist.public = true")
        .offset(from)
        .limit(count)
        .getMany();
    });
  }

  async getRandomGalleries(seed: number, from: number = 0, count: number = 1) {
    const nseed = seed / MAX_SEED;
    return this.artworks.manager.transaction(async mgr => {
      await mgr.query(`SELECT setseed(${nseed})`);
      return await mgr.getRepository(Gallery).createQueryBuilder("gallery")
        .innerJoinAndSelect("gallery.user", "user")
        .orderBy("random()")
        .where("gallery.public = true")
        .offset(from)
        .limit(count)
        .getMany();
    });
  }

  async getRandomExhibitions(seed: number, from: number = 0, count: number = 1) {
    const nseed = seed / MAX_SEED;
    return this.artworks.manager.transaction(async mgr => {
      await mgr.query(`SELECT setseed(${nseed})`);
      return await mgr.getRepository(Exhibition).createQueryBuilder("exhibition")
        .innerJoinAndSelect("exhibition.gallery", "gallery")
        .innerJoinAndSelect("gallery.user", "user")
        .orderBy("random()")
        .where("exhibition.public = true")
        .where("gallery.public = true")
        .offset(from)
        .limit(count)
        .getMany();
    });
  }

  async getRandomNfts(seed: number, from: number = 0, count: number = 1) {
    const nseed = seed / MAX_SEED;
    return this.nfts.manager.transaction(async mgr => {
      await mgr.query(`SELECT setseed(${nseed})`);
      return await mgr.getRepository(Nft).createQueryBuilder("nft")
        .leftJoinAndSelect("nft.artwork", "artwork")
        .leftJoinAndSelect("artwork.artist", "artist")
        .leftJoinAndSelect("artist.user", "user")
        .orderBy("random()")
        .where("artwork.public = true")
        .offset(from)
        .limit(count)
        .getMany();
    });
  }

  async getArtistDetailBySlug(userLabel: string, artistLabel: string) {
    return this.artists.findOne({
      relations: {
        country: true,
        artistCategory: true,
      },
      where: {
        label: artistLabel,
        public: true,
        user: { label: userLabel }
      }
    });
  }

  async getArtworkDetailBySlug(userLabel: string, artistLabel: string, artworkLabel: string) {
    return this.artworks.findOne({
      relations: {
        artist: { user: true },
        artworkGenre: true,
        artworkWorktype: true,
        artworkMaterial: true,
        artworkTechnique: true,
        nft: { collection: true },
      },
      where: {
        label: artworkLabel,
        public: true,
        artist: {
          label: artistLabel,
          public: true,
          user: { label: userLabel }
        }
      }
    });
  }

  async getGalleryDetailBySlug(userLabel: string, galleryLabel: string) {
    return this.galleries.findOne({
      relations: {
        country: true,
      },
      where: {
        label: galleryLabel,
        public: true,
        user: { label: userLabel }
      }
    });
  }

  async getExhibitionDetailBySlug(userLabel: string, galleryLabel: string, exhibitionLabel: string) {
    return this.exhibitions.findOne({
      relations: {
        gallery: { user: true }
      },
      where: {
        label: exhibitionLabel,
        public: true,
        gallery: {
          label: galleryLabel,
          public: true,
          user: { label: userLabel }
        }
      }
    });
  }

  async getArtworkImageBySlug(userLabel: string, artistLabel: string, artworkLabel: string) {
    return this.artworks.findOne({
      select: { id: true, image: { buffer: true, mimeType: true } },
      where: {
        label: artworkLabel,
        public: true,
        artist: {
          label: artistLabel,
          public: true,
          user: { label: userLabel }
        }
      }
    }).then(a => (a != null && a.image?.buffer != null) ? { image: a.image?.buffer, mimeType: a.image?.mimeType } : null);
  }

  async getArtworkProtectedImageBySlug(userLabel: string, artistLabel: string, artworkLabel: string) {
    return this.artworks.findOne({
      select: { id: true, protectedImage: { buffer: true, mimeType: true } },
      where: {
        label: artworkLabel,
        public: true,
        artist: {
          label: artistLabel,
          public: true,
          user: { label: userLabel }
        }
      }
    }).then(a => (a != null && a.protectedImage?.buffer != null) ? { image: a.protectedImage?.buffer, mimeType: a.protectedImage?.mimeType } : null);
  }

  async getArtworkThumbnailBySlug(userLabel: string, artistLabel: string, artworkLabel: string) {
    return this.artworks.findOne({
      select: { id: true, thumbnail: { buffer: true, mimeType: true } },
      where: {
        label: artworkLabel,
        public: true,
        artist: {
          label: artistLabel,
          public: true,
          user: { label: userLabel }
        }
      }
    }).then(a => (a != null && a.thumbnail?.buffer != null) ? { image: a.thumbnail?.buffer, mimeType: a.thumbnail?.mimeType } : null);
  }

  async getArtworkUnityImage(id: ArtworkId) {
    return this.artworks.findOne({
      select: { id: true, unityImage: { buffer: true, mimeType: true } },
      where: {
        id: id,
        public: true,
        artist: { public: true },
      }
    }).then(a => (a != null && a.unityImage?.buffer != null) ? { image: a.unityImage?.buffer, mimeType: a.unityImage?.mimeType } : null);
  }

  async getResourceContent(id: ResourceId) {
    return this.resources.findOne({
      select: { data: true, mimeType: true },
      where: {
        id: id,
        public: true,
      }
    });
  }

  async getDesignerRoom(id: UnityRoomId) {
    return this.unityRooms.findOne({
      relations: {
        walls: { images: true },
        lamps: true,
        items: true,
      },
      where: {
        id: id,
        exhibition: {
          public: true,
        }
      }
    });
  }

  async getItemTypes() {
    return this.unityItemTypes.find();
  }

}
