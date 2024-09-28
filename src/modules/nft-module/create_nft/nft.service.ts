import { Injectable, Logger } from '@nestjs/common';
import '@polkadot/api-augment';
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
    if (!artwork) {
      return null
    }

    //Create metadata
    const description = JSON.stringify({
      description: artwork.description,
      artist: artwork.artist,
      year: artwork.year,
      artworkGenre: artwork.artworkGenre,
      artworkMaterial: artwork.artworkMaterial,
      artworkTechnique: artwork.artworkTechnique,
      artworkWorktype: artwork.artworkWorktype,
      measurements: artwork.measurements,
    });


    const url = this.configService.get("NFT_MODULE_URL");

    const response = await fetch(`${url}/collection/${collectionID}/asset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "owner": address,
        "file": artwork.image,
        "name": artwork.name,
        "metadata": description
      })
    });
    return await response.json();
  }

  async updateNFTCall(artworkId: string, userId: string): Promise<string> {

    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    if (!artwork) {
      return null
    }

    //Create metadata
    const description = JSON.stringify({
      description: artwork.description,
      artist: artwork.artist,
      year: artwork.year,
      artworkGenre: artwork.artworkGenre,
      artworkMaterial: artwork.artworkMaterial,
      artworkTechnique: artwork.artworkTechnique,
      artworkWorktype: artwork.artworkWorktype,
      measurements: artwork.measurements,
    });

    const url = this.configService.get("NFT_MODULE_URL");

    const colAndArtId = artwork.nft.nftData.id;

    const response = await fetch(`${url}/update/asset/${colAndArtId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "file": artwork.image,
        "name": artwork.name,
        "metadata": description
      })
    });
    return await response.json();
  }


  async updateNftInDB(metadataLink: string, artworkId: string, userId: string): Promise<void> {
    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    if (!artwork) {
      return null
    }
    const nft = await this.nftRepository.getNFT(artwork.nft.id);
    if (!nft) {
      return null
    }
    const name = artwork.name;
    //First load metadata from IPFS
    const metadata = await fetch(`https://ipfs.io/ipfs/${metadataLink}`);
    const metadataJson = await metadata.json();
    const image = metadataJson.image;

    //Get nft metadata and update name, metadata, image columns
    nft.nftData.image = image;
    nft.nftData.name = name;
    nft.nftData.metadata = metadataLink;
    await this.nftRepository.updateNFT(nft.id, nft.nftData);

  }
}