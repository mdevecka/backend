import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class MetaFetcher {

  constructor(private nftRepo: NftRepository, private configService: ConfigService<AppConfig>) {

  }

  async fetchMetadata(userID: string, address: string): Promise<Response> {
    //We will fetch metadata for user and save them to the database, 
    //this call is made each time user loads their profile to see NFTS
    //Returns 200 ok if successful so project can fetch from DB
    const url = this.configService.get("NFT_MODULE_URL");

    const response = await fetch(
      url + "/nftmeta/userID/" + userID + "/address/" + address
    );
    const nftData = await response.json();
    if (this.nftRepo.assignNFTsMetadata(userID, address, nftData)) {
      return response;
    }
    else {
      return null
    }
  }
}