import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class NftCreator {
  constructor(private configService: ConfigService<AppConfig>) {

  }

  async createNFTCall(file: MemoryStoredFile, name: string, description: string, userId: string, address: string): Promise<Response> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they have, skip this function and return nothing
    //If they haven't, we create a collection for them


    //TBA Upload collection image to IPFS here for the fetch below
    const ipfs = "IPFS image link";
    const url = this.configService.get("NFT_MODULE_URL");

    const collectionID = 1 //TBA Fetch from DB to get users collection ID also add check if user has a collection ID

    const response = await fetch(url + "/collection/" + collectionID.toString() + "/asset", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "metadata": {
          "name": name,
          "description": description,
          "ipfs": ipfs,
          "author": address
        },
      })
    });

    return response;
  }
}