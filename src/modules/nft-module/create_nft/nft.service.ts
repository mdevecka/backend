import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { AdminRepository, NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class NftCreator {
  private readonly logger = new Logger(NftCreator.name)
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository, private adminRepository: AdminRepository) {

  }

  async createNFTCall(collectionID: string, artworkId: string, address: string, userId: string): Promise<string> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they didnt return null and do nothing

    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    if (artwork == null) {
      return null
    }

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


    const url = this.configService.get("NFT_MODULE_URL");

    const formData = new FormData();
    const fileBlob = new Blob([artwork.image.buffer], { type: artwork.image.mimeType });

    // Append fields and files to the FormData object
    formData.append('file', fileBlob);
    formData.append('name', artwork.name);
    formData.append('metadata', description);
    formData.append('owner', address);

    const response = await fetch(`${url}/collection/${collectionID}/asset`, {
      method: 'PUT',
      body: formData
    });
    return await response.json();
  }

  async updateNFTCall(artworkId: string, userId: string): Promise<string> {

    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    if (artwork == null) {
      return null
    }

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

    const url = this.configService.get("NFT_MODULE_URL");

    const colAndArtId = artwork.nft.nftData.id;


    const formData = new FormData();
    const fileBlob = new Blob([artwork.image.buffer], { type: artwork.image.mimeType });

    // Append fields and files to the FormData object
    formData.append('file', fileBlob);          // Ensure 'file' is a File or Blob object
    formData.append('name', artwork.name);
    formData.append('metadata', description);

    const response = await fetch(`${url}/update/asset/${colAndArtId}`, {
      method: 'PUT',
      body: formData
    });
    return await response.json();
  }


  async updateNftInDB(metadataLink: string, artworkId: string, userId: string): Promise<void> {
    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    if (artwork == null) {
      return null
    }
    const nft = await this.nftRepository.getNFT(artwork.nft.id);
    if (nft == null) {
      return null
    }
    const name = artwork.name;
    //First load metadata from IPFS
    const metadata = await fetch(`https://flk-ipfs.xyz/ipfs/${metadataLink}`);
    const metadataJson = await metadata.json();
    const image = metadataJson.image;

    //Get nft metadata and update name, metadata, image columns
    nft.nftData.image = image;
    nft.nftData.name = name;
    nft.nftData.description = metadataLink;
    await this.nftRepository.updateNFT(nft.id, nft.nftData);

  }
}