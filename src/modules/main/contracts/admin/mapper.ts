import { UserDto } from './user.dto';
import { ArtworkDto } from './artwork.dto';
import { ArtistDto } from './artist.dto';
import { GalleryDto } from './gallery.dto';
import { ExhibitionDto } from './exhibition.dto';
import { ArtistDetailDto } from './artist-detail.dto';
import { ArtworkDetailDto } from './artwork-detail.dto';
import { GalleryDetailDto } from './gallery-detail.dto';
import { ExhibitionDetailDto } from './exhibition-detail.dto';
import { ArtworkExhibitionDto } from './artwork-exhibition.dto';
import { GalleryExhibitionDto } from './gallery-exhibition.dto';
import { ExhibitionArtworkDto } from './exhibition-artwork.dto';
import { ArtistArtworkDto } from './artist-artwork.dto';
import { CountryDto } from './country.dto';
import { OptionDto } from './option.dto';
import {
  User, Artist, Artwork, Gallery, Exhibition, Country
} from '@modules/app-db/entities';


export function createOptionDto(entity: { id: string, name: string }): OptionDto {
  return {
    id: entity.id,
    name: entity.name,
  };
}

export function createCountryDto(country: Country): CountryDto {
  return {
    id: country.id,
    name: country.name,
    code: country.code,
  };
}

export function createUserDto(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    description: user.description,
  };
}

export function createArtistDto(artist: Artist): ArtistDto {
  return {
    id: artist.id,
    name: artist.name,
    born: artist.born,
    biography: artist.biography,
    country: createCountryDto(artist.country),
    artistCategory: createOptionDto(artist.artistCategory),
    active: artist.active,
  };
}

export function createArtworkDto(artwork: Artwork): ArtworkDto {
  return {
    id: artwork.id,
    name: artwork.name,
    description: artwork.description,
    artist: {
      id: artwork.artist.id,
      name: artwork.artist.name,
      born: artwork.artist.born,
      biography: artwork.artist.biography,
    },
    year: artwork.year,
    nft: artwork.nft,
    ai: artwork.ai,
    tags: artwork.tags,
    artworkGenre: createOptionDto(artwork.artworkGenre),
    artworkWorktype: createOptionDto(artwork.artworkWorktype),
    artworkMaterial: createOptionDto(artwork.artworkMaterial),
    artworkTechnique: createOptionDto(artwork.artworkTechnique),
    measurements: artwork.measurements,
    width: artwork.width,
    height: artwork.height,
    active: artwork.active,
  };
}

export function createGalleryDto(gallery: Gallery): GalleryDto {
  return {
    id: gallery.id,
    name: gallery.name,
    description: gallery.description,
    address: gallery.address,
    country: createCountryDto(gallery.country),
    gps: gallery.gps,
    active: gallery.active,
  };
}

export function createExhibitionDto(exhibition: Exhibition): ExhibitionDto {
  return {
    id: exhibition.id,
    name: exhibition.name,
    fromDate: exhibition.fromDate.toISOString(),
    toDate: exhibition.toDate.toISOString(),
    curator: exhibition.curator,
    gallery: {
      id: exhibition.gallery.id,
      name: exhibition.gallery.name,
      description: exhibition.gallery.description,
      address: exhibition.gallery.address,
      gps: exhibition.gallery.gps,
    },
    active: exhibition.active,
  };
}

export function createArtistDetailDto(artist: Artist): ArtistDetailDto {
  return {
    id: artist.id,
    name: artist.name,
    born: artist.born,
    biography: artist.biography,
    country: createCountryDto(artist.country),
    artistCategory: createOptionDto(artist.artistCategory),
    active: artist.active,
  };
}

export function createArtworkDetailDto(artwork: Artwork): ArtworkDetailDto {
  return {
    id: artwork.id,
    name: artwork.name,
    description: artwork.description,
    artist: {
      id: artwork.artist.id,
      name: artwork.artist.name,
      born: artwork.artist.born,
      biography: artwork.artist.biography,
    },
    year: artwork.year,
    nft: artwork.nft,
    ai: artwork.ai,
    tags: artwork.tags,
    artworkGenre: createOptionDto(artwork.artworkGenre),
    artworkWorktype: createOptionDto(artwork.artworkWorktype),
    artworkMaterial: createOptionDto(artwork.artworkMaterial),
    artworkTechnique: createOptionDto(artwork.artworkTechnique),
    measurements: artwork.measurements,
    width: artwork.width,
    height: artwork.height,
    active: artwork.active,
  };
}

export function createGalleryDetailDto(gallery: Gallery): GalleryDetailDto {
  return {
    id: gallery.id,
    name: gallery.name,
    description: gallery.description,
    address: gallery.address,
    country: createCountryDto(gallery.country),
    gps: gallery.gps,
    active: gallery.active,
  };
}

export function createExhibitionDetailDto(exhibition: Exhibition): ExhibitionDetailDto {
  return {
    id: exhibition.id,
    name: exhibition.name,
    fromDate: exhibition.fromDate.toISOString(),
    toDate: exhibition.toDate.toISOString(),
    curator: exhibition.curator,
    gallery: {
      id: exhibition.gallery.id,
      name: exhibition.gallery.name,
      description: exhibition.gallery.description,
      address: exhibition.gallery.address,
      gps: exhibition.gallery.gps,
    },
    active: exhibition.active,
  };
}

export function createArtworkExhibitionDto(exhibition: Exhibition): ArtworkExhibitionDto {
  return {
    id: exhibition.id,
    name: exhibition.name,
    fromDate: exhibition.fromDate.toISOString(),
    toDate: exhibition.toDate.toISOString(),
    curator: exhibition.curator,
    gallery: {
      id: exhibition.gallery.id,
      name: exhibition.gallery.name,
    },
    active: exhibition.active,
  };
}

export function createGalleryExhibitionDto(exhibition: Exhibition): GalleryExhibitionDto {
  return {
    id: exhibition.id,
    name: exhibition.name,
    fromDate: exhibition.fromDate.toISOString(),
    toDate: exhibition.toDate.toISOString(),
    curator: exhibition.curator,
    gallery: {
      id: exhibition.gallery.id,
      name: exhibition.gallery.name,
    },
    active: exhibition.active,
  };
}

export function createExhibitionArtworkDto(artwork: Artwork): ExhibitionArtworkDto {
  return {
    id: artwork.id,
    name: artwork.name,
    description: artwork.description,
    artist: {
      id: artwork.artist.id,
      name: artwork.artist.name,
      born: artwork.artist.born,
      biography: artwork.artist.biography,
    },
    year: artwork.year,
    nft: artwork.nft,
    ai: artwork.ai,
    tags: artwork.tags,
    artworkGenre: createOptionDto(artwork.artworkGenre),
    artworkWorktype: createOptionDto(artwork.artworkWorktype),
    artworkMaterial: createOptionDto(artwork.artworkMaterial),
    artworkTechnique: createOptionDto(artwork.artworkTechnique),
    measurements: artwork.measurements,
    width: artwork.width,
    height: artwork.height,
    active: artwork.active,
  };
}

export function createArtistArtworkDto(artwork: Artwork): ArtistArtworkDto {
  return {
    id: artwork.id,
    name: artwork.name,
    description: artwork.description,
    artist: {
      id: artwork.artist.id,
      name: artwork.artist.name,
      born: artwork.artist.born,
      biography: artwork.artist.biography,
    },
    year: artwork.year,
    nft: artwork.nft,
    ai: artwork.ai,
    tags: artwork.tags,
    artworkGenre: createOptionDto(artwork.artworkGenre),
    artworkWorktype: createOptionDto(artwork.artworkWorktype),
    artworkMaterial: createOptionDto(artwork.artworkMaterial),
    artworkTechnique: createOptionDto(artwork.artworkTechnique),
    measurements: artwork.measurements,
    width: artwork.width,
    height: artwork.height,
    active: artwork.active,
  };
}
