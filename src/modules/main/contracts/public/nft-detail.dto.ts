export interface NftDetailDto {
  nftData: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  canBeMinted: boolean;
  artwork: {
    name: string;
    slug: string;
  }
}
