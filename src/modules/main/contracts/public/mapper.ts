import { ArtistDto } from './artist.dto';
import { ArtistDetailDto } from './artist-detail.dto';
import { ArtworkDto } from './artwork.dto';
import { ArtworkDetailDto } from './artwork-detail.dto';
import { GalleryDto } from './gallery.dto';
import { GalleryDetailDto } from './gallery-detail.dto';
import { ExhibitionDto } from './exhibition.dto';
import { ExhibitionDetailDto } from './exhibition-detail.dto';
import { NftDto } from './nft.dto';
import { mapEmpty } from '@common/helpers';
import {
  Artist, Artwork, Gallery, Exhibition, Nft
} from '@modules/app-db/entities';

export { createDesignerRoomDto, createDesignerLibraryItemDto } from '../admin/read';

export function createArtistDto(artist: Artist): ArtistDto {
  return {
    name: artist.name,
    born: artist.born,
    biography: artist.biography,
    countryCode: artist.country.code,
    artistCategory: artist.artistCategory?.name,
    slug: artist.slug,
  };
}

export function createArtistDetailDto(artist: Artist): ArtistDetailDto {
  return {
    name: artist.name,
    born: artist.born,
    biography: artist.biography,
    countryCode: artist.country.code,
    artistCategory: artist.artistCategory?.name,
    facebookProfileLink: artist.facebookProfileLink,
    instagramProfileLink: artist.instagramProfileLink,
    xProfileLink: artist.xProfileLink,
  };
}

export function createArtworkDto(artwork: Artwork): ArtworkDto {
  return {
    name: artwork.name,
    description: artwork.description,
    artistName: artwork.artist.name,
    year: artwork.year,
    slug: artwork.slug,
  };
}

export function createArtworkDetailDto(artwork: Artwork): ArtworkDetailDto {
  return {
    name: artwork.name,
    description: artwork.description,
    artist: {
      name: artwork.artist.name,
      born: artwork.artist.born,
      biography: artwork.artist.biography,
      slug: artwork.artist.slug,
    },
    year: artwork.year,
    nft: mapEmpty(artwork.nft, nft => ({
      nftData: mapEmpty(nft.nftData, nftData => ({
        name: nftData.name,
        image: nftData.image,
      })),
      collection: mapEmpty(nft.collection, col => ({
        colData: mapEmpty(col.colData, colData => ({
          name: colData.name,
          image: colData.image,
        }))
      }))
    })),
    ai: artwork.ai,
    tags: artwork.tags,
    artworkGenre: artwork.artworkGenre?.name,
    artworkWorktype: artwork.artworkWorktype?.name,
    artworkMaterial: artwork.artworkMaterial?.name,
    artworkTechnique: artwork.artworkTechnique?.name,
    measurements: artwork.measurements,
    width: artwork.width,
    height: artwork.height,
  };
}

export function createGalleryDto(gallery: Gallery): GalleryDto {
  return {
    name: gallery.name,
    description: gallery.description,
    address: gallery.address,
    countryCode: gallery.country?.code,
    gps: gallery.gps,
    slug: gallery.slug,
  };
}

export function createGalleryDetailDto(gallery: Gallery): GalleryDetailDto {
  return {
    name: gallery.name,
    description: gallery.description,
    address: gallery.address,
    countryCode: gallery.country?.code,
    gps: gallery.gps,
  };
}

export function createExhibitionDto(exhibition: Exhibition): ExhibitionDto {
  return {
    fromDate: exhibition.fromDate.toISOString(),
    toDate: exhibition.toDate.toISOString(),
    curator: exhibition.curator,
    gallery: {
      name: exhibition.gallery.name,
      slug: exhibition.gallery.slug,
    },
    activeRoomId: exhibition.activeRoomId,
    slug: exhibition.slug,
  };
}

export function createExhibitionDetailDto(exhibition: Exhibition): ExhibitionDetailDto {
  return {
    fromDate: exhibition.fromDate.toISOString(),
    toDate: exhibition.toDate.toISOString(),
    curator: exhibition.curator,
    gallery: {
      name: exhibition.gallery.name,
      slug: exhibition.gallery.slug,
    },
    activeRoomId: exhibition.activeRoomId,
  };
}

export function createNftDto(nft: Nft): NftDto {
  return {
    nftData: {
      name: nft.nftData.name,
      image: nft.nftData.image,
    },
    canBeMinted: nft.canBeMinted,
    artwork: {
      name: nft.artwork.name,
      slug: nft.artwork.slug,
    }
  };
}
