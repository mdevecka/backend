import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { MetaDto } from './dto/MetaDto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class MetaFetcher {

  constructor(private nftRepo: NftRepository, private configService: ConfigService<AppConfig>) {

  }

  async fetchMetadata(account: MetaDto): Promise<Response> {
    //We will fetch metadata for user and save them to the database, 
    //this call is made each time user loads their profile to see NFTS
    //Returns 200 ok if successful so project can fetch from DB
    const url = this.configService.get("NFT_MODULE_URL");

    const response = await fetch(
      url + "/address/" + account.toString()
    );

    //this.nftRepo.saveMetadata(response, account, userID);

    //TBA The response is then saved to the database and if successful we return 200 ok, if not we return 400 please try again

    return response;
  }
}