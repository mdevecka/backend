export interface NftDto {
  id: string;
  walletId: string;
  nftData: {
    id: string;
    name: string;
    metadata: string;
    image: string;
  }
  artwork: {
    id: string;
    name: string;
    description: string;
    artistId: string;
    year: string;
    ai: boolean;
    tags: string;
    artworkGenreId: string;
    artworkWorktypeId: string;
    artworkMaterialId: string;
    artworkTechniqueId: string;
    measurements: string;
    width: number;
    height: number;
    public: boolean;
  }
}
