export interface ArtworkDetailDto {
  name: string;
  description: string;
  artist: {
    name: string;
    born: string;
    biography: string;
    slug: string;
    countryCode: string;
  };
  year: string;
  nft: {
    nftData: {
      name: string;
      image: string;
    }
    collection: {
      colData: {
        name: string;
        image: string;
      }
    }
  }
  ai: boolean;
  tags: string;
  artworkGenre: string;
  artworkWorktype: string;
  artworkMaterial: string;
  artworkTechnique: string;
  measurements: string;
  width: number;
  height: number;
  likes: number;
}
