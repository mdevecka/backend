export interface NftDto {
  nftData: {
    name: string;
    image: string;
  }
  canBeMinted: boolean;
  artwork: {
    name: string;
    slug: string;
  }
}
