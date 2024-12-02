import { NftId, WalletId, CollectionId, ArtworkId } from '@modules/app-db/entities';

export interface EvaDetailDto {
  id: NftId;
  walletId: WalletId;
  collectionId: CollectionId,
  nftData: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  onlineCheck: string;
  canBeMinted: boolean;
  artwork: {
    id: ArtworkId;
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
  collection: {
    id: CollectionId;
    onlineCheck: string;
    colData: {
      id: string;
      name: string;
      description: string;
      image: string;
    }
  }
  wallet: {
    id: WalletId;
    walletAddress: string;
    onlineCheck: string;
  }
}

