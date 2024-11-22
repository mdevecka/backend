export interface NftDto {
  nftData: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  canBeMinted: boolean;
  slug: string;
  artwork: {
    name: string;
    slug: string;
  }
}
