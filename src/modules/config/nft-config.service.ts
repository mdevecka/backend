import { Injectable, Logger } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class NftConfigService {

  private readonly logger = new Logger(NftConfigService.name)

  private collectionID: string;
  private ipfsLink: string;
  private walletAddr: string;
  private walletID: string;

  get collectionId() { return this.collectionID; }
  get ipfsUrl() { return this.ipfsLink; }
  get walletId() { return this.walletID; }
  get walletAddress() { return this.walletAddr; }

  constructor(private appConfig: AppConfigService, private nftRepository: NftRepository) {
  }

  async onModuleInit() {
    const url = this.appConfig.nftModuleUrl;
    if (url == null) {
      this.logger.warn("missing configuration for NFT MODULE - all NFT related functionality will not be available");
      return;
    }
    const collectionIDResponse = await fetch(`${url}/eva/wallet/collection`);

    this.collectionID = await collectionIDResponse.text();

    const EvaGalleryWalletAddressResponse = await fetch(`${url}/eva/wallet/address`);
    this.walletAddr = await EvaGalleryWalletAddressResponse.text();

    const wallet = await this.nftRepository.ensureWallet(this.walletAddr);
    this.walletID = wallet.id;

    const ipfsUrl = await fetch(`${url}/eva/ipfs/url`);
    this.ipfsLink = await ipfsUrl.text();
  }

  convertIpfsLink(link: string): string {
    let metadata = link;

    if (metadata.startsWith("ipfs://ipfs/")) {
      metadata = this.ipfsLink + "/ipfs" + metadata.slice(11);
    }
    else if (metadata.startsWith("https://ipfs.io/ipfs/")) {
      metadata = this.ipfsLink + "/ipfs" + metadata.slice(16);
    }
    else if (metadata.startsWith("ipfs://")) {
      metadata = this.ipfsLink + "/ipfs/" + metadata.slice(7);
    }
    else if (!metadata.startsWith("https://ipfs1.fiit.stuba.sk")) {
      metadata = this.ipfsLink + "/ipfs" + metadata;
    }
    return metadata;
  }

  async fetchMetadataFromIPFS(metadatalink: string): Promise<string> {
    // Fetch metadata from IPFS
    // Return the metadata 
    try {
      const response = await fetch(metadatalink);

      if (!response.ok) {
        return null;
      }
      if (response != null) {
        const parsed_data = await response.text();
        return parsed_data;
      }

    } catch (error) {
      this.logger.error(error);
      return null;
    }

  }

}