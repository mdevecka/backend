import { CollectionId, NftId, WalletId, ArtworkId } from '@modules/app-db/entities';

export interface WalletCollectionNftDto {
  id: NftId;
  artworkId: ArtworkId,
  nftData: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  onlineCheck: string;
  canBeMinted: boolean;
}

export interface WalletCollectionDto {
  id: CollectionId;
  colData: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  onlineCheck: string;
  nfts: WalletCollectionNftDto[];
  canBeMinted: boolean;
}

export interface WalletDto {
  id: WalletId;
  walletAddress: string;
  collections: WalletCollectionDto[];
  orphanNfts: WalletCollectionNftDto[];
}
