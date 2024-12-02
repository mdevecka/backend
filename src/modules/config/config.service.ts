import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';


@Injectable()
export class AppConfigService {
  get walletAddress(): string {
    return this.walletAddr;
  }
  private collectionID: string;
  private walletAddr: string;
  private walletID: string;

  get collectionId(): string {
    return this.collectionID;
  }

  get walletId(): string {
    return this.walletID;
  }
  
  private readonly logger = new Logger(AppConfigService.name)
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository) {

  }

  async onModuleInit() {
    const url = this.configService.get("NFT_MODULE_URL");
    const collectionIDResponse = await fetch(`${url}/eva/wallet/collection`);

    this.collectionID = await collectionIDResponse.text();

    const EvaGalleryWalletAddressResponse = await fetch(`${url}/eva/wallet/address`);
    this.walletAddr = await EvaGalleryWalletAddressResponse.text();

    const wallet = await this.nftRepository.ensureWallet(this.walletAddr);
    this.walletID = wallet.id;
  }

  convertIpfsLink(link: string): string {
  let metadata = link;

  if (metadata.startsWith("ipfs://ipfs/")) {
    metadata = this.configService.get("IPFS_URL") + "/ipfs" + metadata.slice(11);
  }
  else if (metadata.startsWith("https://ipfs.io/ipfs/")) {
    metadata = this.configService.get("IPFS_URL") + "/ipfs" + metadata.slice(16);
  }
  else if (metadata.startsWith("ipfs:/")) {
    metadata = this.configService.get("IPFS_URL") + "/ipfs" + metadata.slice(7);
  }
  else if (!metadata.startsWith("https://ipfs1.fiit.stuba.sk")) {
    metadata = this.configService.get("IPFS_URL") + "/ipfs" + metadata;
  }
  return metadata;
}

async fetchMetadataFromIPFS(metadatalink: string): Promise<string> {
  // Fetch metadata from IPFS
  // Return the metadata 

  try {
    const response = await fetch(metadatalink, {
      headers: {
        'Authorization': 'Basic ' + btoa(this.configService.get('IPFS_USERNAME') + ':' + this.configService.get('IPFS_PASSWORD'))
      }
    });
    if (!response.ok) {
      return null;
    }
    if (response != null) {
      const parsed_data = await response.json();
      return parsed_data;
    }

  } catch (error) {
    this.logger.error(error);
    return null;
  }

}

}