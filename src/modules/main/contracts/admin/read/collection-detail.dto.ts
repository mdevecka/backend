import { CollectionId, NftId, WalletId, ArtworkId } from '@modules/app-db/entities';

export interface CollectionDetailNftDto {
  id: NftId;
  walletId: WalletId;
  artworkId: ArtworkId;
  nftData: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  onlineCheck: string;
  canBeMinted: boolean;
}

export interface CollectionDetailDto {
  id: CollectionId;
  walletId: WalletId;
  colData: {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  onlineCheck: string;
  canBeMinted: boolean;
  nfts: CollectionDetailNftDto[];
}
