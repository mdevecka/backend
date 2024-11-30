import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { AdminRepository, NftRepository } from '@modules/app-db/repositories';
import { NftData } from '@modules/app-db/entities';
import { convertIpfsLink } from '@common/helpers';
import { NftUpdateDto } from './dto/NFTDto';
import { AppConfigService } from '@modules/config/config.service';

export enum UpdateStatus {
  Success = 'Success',
  Failed = 'Failed'
}

@Injectable()
export class NftCreator {
  private readonly logger = new Logger(NftCreator.name)
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository, private adminRepository: AdminRepository, private appConfigService: AppConfigService) {

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

  async updateNFTInDB(form: NftUpdateDto, nftId: string): Promise<UpdateStatus> {

    const nft = await this.nftRepository.getNFT(nftId);
    console.log(nft);


    const nftData = nft.nftData;

    nftData.name = form.name;
    nftData.description = form.metadata
    
    try{
      await this.nftRepository.updateNFT(nftId, nftData);
    }
    catch(err){
      this.logger.error(err);
      return UpdateStatus.Failed;
    }

    return UpdateStatus.Success;
  }


  async updateNFTCall(form: NftUpdateDto, artworkId: string, nftId: string, userId: string): Promise<string> {
    const { name, metadata } = form;
    let artworkImage;
    const nft = await this.nftRepository.getNFT(nftId);

    //NFTs not associated with any artwork will fail search for artwork. Fetch image from IPFS
    try {
      artworkImage = await this.adminRepository.getArtworkImage(userId, artworkId);
    }
    catch(err){
      this.logger.error(err);
      artworkImage = await fetch(nft.nftData.image).then(res => res.blob());
      artworkImage = { image: artworkImage, mimeType: artworkImage.type };
    }

    const url = this.configService.get("NFT_MODULE_URL");

    const formData = new FormData();

    // Append fields and files to the FormData object
    formData.append('name', name);
    formData.append('imgType', artworkImage.mimeType);
    formData.append('metadata', metadata);
    formData.append('imgIpfs', nft.nftData.image);

    const response = await fetch(`${url}/update/asset/${nft.nftData.id}`, {
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
    const EvaGalleryWalletAddress = this.appConfigService.walletAddress;
    return await this.nftRepository.getWallet(EvaGalleryWalletAddress); 

  }

  async createWallet(walletAddr: string, userId: string) {
    return await this.nftRepository.ensureWallet(walletAddr, userId);
  }

  async removeNFTinDB( nftId: string, userId: string): Promise<UpdateStatus> {
    try{
      await this.nftRepository.removeNFT(userId,nftId);
    }
    catch(err){
      this.logger.error(err);
      return UpdateStatus.Failed;
    }
    return UpdateStatus.Success;
  }

  async removeNft(nftId: string, userId: string): Promise<string> {

      const nft = await this.adminRepository.getNftDetail(userId, nftId);

      const url = this.configService.get("NFT_MODULE_URL");

      const response = await fetch(`${url}/collection/remove/asset/${nft.nftData.id}`, {
        method: 'DELETE',
      });
  
      return await response.json();
  }
}

