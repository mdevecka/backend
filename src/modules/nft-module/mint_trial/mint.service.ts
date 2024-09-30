import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';
import { NftData } from '@modules/app-db/entities';

@Injectable()
export class MintCreator {
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository) {

  }

  async createMint(userId: string, artworkId: string): Promise<void> {
    //First we check if user has the right to mint an NFT, if they have already minted an NFT we return null
    //If they haven't we create the NFT for them

    const user = await this.nftRepository.getUser(userId);
    const artwork = await this.nftRepository.getArtwork(userId, artworkId);

    if (!artwork && user.trialMintClaimed == true && user.trialMint != null) {
      return null;
    }

    const url = this.configService.get("NFT_MODULE_URL");

    //Create metadata
    const description = JSON.stringify({
      description: artwork.description,
      artist: artwork.artist.name,
      year: artwork.year,
      artworkGenre: artwork.artworkGenre,
      artworkMaterial: artwork.artworkMaterial,
      artworkTechnique: artwork.artworkTechnique,
      artworkWorktype: artwork.artworkWorktype,
      measurements: artwork.measurements,
    });

    const formData = new FormData();
    const fileBlob = new Blob([artwork.image.buffer], { type: artwork.image.mimeType });

    // Append fields and files to the FormData object
    formData.append('file', fileBlob);
    formData.append('name', artwork.name);
    formData.append('metadata', description);

    const response = await fetch(`${url}/trial/mint`, {
      method: 'PUT',
      body: formData
    });

    const collectionID = this.configService.get("EVA_GALLERY_COLLECTION");
    const EvaGalleryWalletAddress = this.configService.get("EVA_GALLERY_WALLET_ADDRESS");

    const { nftId, metadataCid, cid } = await response.json();

    if (nftId != null || metadataCid != null || cid != null) {

      const nft: NftData = {
        id: `${collectionID}-${nftId}`,
        name: artwork.name,
        metadata: metadataCid,
        image: cid
      }


      await this.nftRepository.trialMint(user.id, artworkId, nft, EvaGalleryWalletAddress)
      return;
    }
  }
}