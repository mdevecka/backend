import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { MetaDto } from './dto/MetaDto';


@Injectable()
export class metaFetcher {

   async fetchMetadata(account: MetaDto): Promise<any> {
    //We will fetch metadata for user and save them to the database, 
    //this call is made each time user loads their profile to see NFTS
    //Returns 200 ok if successful so project can fetch from DB


    const response = await fetch(
        "http://localhost:3001/nftmeta?" +
        new URLSearchParams({
            "address": account.address
        })
    );

    //TBA The response is then saved to the database and if successful we return 200 ok, if not we return 400 please try again
    
    return response;
  }
}