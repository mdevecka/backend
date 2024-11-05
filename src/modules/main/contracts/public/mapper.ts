import { ArtworkDto } from './artwork.dto';
import { ArtworkDetailDto } from './artwork-detail.dto';
import { mapEmpty } from '@common/helpers';
import {
  Artwork
} from '@modules/app-db/entities';

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
    slug: artwork.slug,
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
