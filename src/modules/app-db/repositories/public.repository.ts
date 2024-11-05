import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Artist, Artwork, Resource, UnityItemType,
  ArtworkId, ResourceId,
} from '../entities';

export const MAX_SEED = 2 ** 32;

@Injectable()
export class PublicRepository {

  constructor(
    @InjectRepository(Artist) private artists: Repository<Artist>,
    @InjectRepository(Artwork) private artworks: Repository<Artwork>,
    @InjectRepository(UnityItemType) private unityItemTypes: Repository<UnityItemType>,
    @InjectRepository(Resource) private resources: Repository<Resource>,
  ) { }

  async getRandomArtists(seed: number, from: number = 0, count: number = 1) {
    const nseed = seed / MAX_SEED;
    return this.artists.manager.transaction(async mgr => {
      await mgr.query(`SELECT setseed(${nseed})`);
      return await mgr.getRepository(Artist).createQueryBuilder("artist")
        .innerJoinAndSelect("artist.user", "user")
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

  async getArtworkDetail(userLabel: string, artistLabel: string, artworkLabel: string) {
    return this.artworks.findOne({
      relations: {
        artist: true,
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

  async getArtworkImage(userLabel: string, artistLabel: string, artworkLabel: string) {
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

  async getArtworkProtectedImage(userLabel: string, artistLabel: string, artworkLabel: string) {
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

  async getArtworkThumbnail(userLabel: string, artistLabel: string, artworkLabel: string) {
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

  async getItemTypes() {
    return this.unityItemTypes.find();
  }

}
