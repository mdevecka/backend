import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class MetaFetcher {

  constructor(private nftRepo: NftRepository, private configService: ConfigService<AppConfig>) {

  }

  async fetchNFTMetadata(userID: string, address: string): Promise<string> {
    //We will fetch metadata for user and save them to the database, 
    //this call is made each time user loads their profile to see NFTS
    //Returns 200 ok if successful so project can fetch from DB
    const url = this.configService.get("NFT_MODULE_URL");

    const response = await fetch(
      `${url}/address/${address}`
    );

    const data = await response.json(); // Read the response body once

    await this.nftRepo.assignNFTsMetadata(userID, address, JSON.stringify(data));
    return JSON.stringify(data); // Return the stringified JSON data
  }

  async fetchColMetadata(userID: string, address: string): Promise<string> {
    const url = this.configService.get("NFT_MODULE_URL");

    const response = await fetch(
      `${url}/collection/address/${address}`
    );

    const data = await response.json(); // Read the response body once

    await this.nftRepo.assignColsMetadata(userID, address, JSON.stringify(data));
    return JSON.stringify(data); // Return the stringified JSON data
  }
}