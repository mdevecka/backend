import { Injectable } from '@nestjs/common';
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

  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository) {

  }

  async onModuleInit() {
    const url = this.configService.get("NFT_MODULE_URL");
    const collectionIDResponse = await fetch(`${url}/eva/wallet/collection`);

    this.collectionID = await collectionIDResponse.text();

    const EvaGalleryWalletAddressResponse = await fetch(`${url}/eva/wallet/address`);
    this.walletAddr = await EvaGalleryWalletAddressResponse.text();

    const wallet = await this.nftRepository.createWallet(this.walletAddr);
    this.walletID = wallet.id;
  }

}