import { CollectionId, NftId, WalletId, ArtworkId } from '@modules/app-db/entities';

export interface WalletDetailCollectionNftDto {
  id: NftId;
  artworkId: ArtworkId,
  nftData: {
    id: string;
    name: string;
    metadata: string;
    image: string;
  }
  canBeMinted: boolean;
}

export interface WalletDetailCollectionDto {
  id: CollectionId;
  colData: {
    id: string;
    name: string;
    metadata: string;
    image: string;
  }
  nfts: WalletDetailCollectionNftDto[];
  canBeMinted: boolean;
}

export interface WalletDetailDto {
  id: WalletId;
  walletAddress: string;
  collections: WalletDetailCollectionDto[];
  orphanNfts: WalletDetailCollectionNftDto[];
}
