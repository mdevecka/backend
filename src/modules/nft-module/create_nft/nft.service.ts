import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { AdminRepository, NftRepository } from '@modules/app-db/repositories';
import { NftData } from '@modules/app-db/entities';
import { convertIpfsLink } from '@common/helpers';

@Injectable()
export class NftCreator {
  private readonly logger = new Logger(NftCreator.name)
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository, private adminRepository: AdminRepository) {

  }

  async createNFTCall(collectionID: string, artworkId: string, address: string, userId: string): Promise<string> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they didnt return null and do nothing

    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    const artworkImage = await this.adminRepository.getArtworkImage(userId, artworkId);
    if (artwork == null) {
      return null
    }

    //Create metadata
    const descriptionParts = [
      artwork.description ? `Description: ${artwork.description}` : null,
      artwork.artist?.name ? `Artist: ${artwork.artist.name}` : null,
      artwork.year ? `Year: ${artwork.year}` : null,
      artwork.artworkGenre?.name ? `Genre: ${artwork.artworkGenre.name}` : null,
      artwork.artworkMaterial?.name ? `Material: ${artwork.artworkMaterial.name}` : null,
      artwork.artworkTechnique?.name ? `Technique: ${artwork.artworkTechnique.name}` : null,
      artwork.artworkWorktype?.name ? `Worktype: ${artwork.artworkWorktype.name}` : null,
      artwork.measurements ? `Measurements: ${artwork.measurements}` : null,
    ].filter(part => part !== null);

    const description = descriptionParts.join(', ');

    const url = this.configService.get("NFT_MODULE_URL");

    const formData = new FormData();
    const fileBlob = new Blob([artworkImage.image], { type: artworkImage.mimeType });

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

  async createNftInDB(nftID: string, metadataCid: string, walletAddr: string , artworkId: string, userId: string): Promise<string> {
    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    if (artwork == null) {
      return null
    }

    //replace ipfs://ipfs/ with https://flk-ipfs.xyz/ipfs
    let metadata = metadataCid as string;
    if (metadata.startsWith("ipfs://ipfs/")) {
      metadata = convertIpfsLink(metadata);
    }
    const cidResp = await fetch(metadata);

    const cid = await cidResp.json()

    //also replace ipfs://ipfs/ with https://flk-ipfs.xyz/ipfs
    let image = cid.image as string;
    if (image.startsWith("ipfs://ipfs/")) {
      image = convertIpfsLink(image);
    }

    const wallets = await this.adminRepository.getWallets(userId);
    const wallet = wallets.find(w => w.walletAddress === walletAddr);
    if (wallet === undefined) {
      throw new Error('Wallet not found');
    }

    const nft: NftData = {
      id: nftID,
      name: artwork.name,
      description: cid.description,
      image: image,
    }

    const resp = await this.nftRepository.createNFT(nft, wallet.id, artworkId);
    return resp.id;
  }

  async updateNFTCall(artworkId: string, userId: string): Promise<string> {

    const artwork = await this.nftRepository.getArtwork(userId, artworkId);
    if (artwork == null) {
      return null
    }

    //Create metadata
    const descriptionParts = [
      artwork.description ? `Description: ${artwork.description}` : null,
      artwork.artist?.name ? `Artist: ${artwork.artist.name}` : null,
      artwork.year ? `Year: ${artwork.year}` : null,
      artwork.artworkGenre?.name ? `Genre: ${artwork.artworkGenre.name}` : null,
      artwork.artworkMaterial?.name ? `Material: ${artwork.artworkMaterial.name}` : null,
      artwork.artworkTechnique?.name ? `Technique: ${artwork.artworkTechnique.name}` : null,
      artwork.artworkWorktype?.name ? `Worktype: ${artwork.artworkWorktype.name}` : null,
      artwork.measurements ? `Measurements: ${artwork.measurements}` : null,
    ].filter(part => part !== null);

    const description = descriptionParts.join(', ');

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
  async getEvaWalletDetail() {
    const url = this.configService.get("NFT_MODULE_URL");
    const EvaGalleryWalletAddressResponse = await fetch(`${url}/eva/wallet/address`);
    const EvaGalleryWalletAddress = await EvaGalleryWalletAddressResponse.text();

    return await this.nftRepository.getWallet(EvaGalleryWalletAddress); 

  }
}

