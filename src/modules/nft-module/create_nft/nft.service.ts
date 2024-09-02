import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { MemoryStoredFile } from 'nestjs-form-data';
const { create } = require('ipfs-http-client');
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class NftCreator {
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository) {

  }

  async createNFTCall(file: MemoryStoredFile, name: string, description: string, userId: string, address: string): Promise<Response> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they didnt return null and do nothing

    if (await this.nftRepository.getUserCollectionID(userId) == null) {
      return null
    }

    const IPFS_NODE_URL = this.configService.get("IPFS_URL");
    const username = this.configService.get("IPFS_NAME");
    const password = this.configService.get("IPFS_PASSWORD");

    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    const client = create({
      url: IPFS_NODE_URL,
      headers: {
        authorization: auth,
      },
    });

    const { cid } = await client.add(file.buffer);

    const url = this.configService.get("NFT_MODULE_URL");

    const collectionID = await this.nftRepository.getUserCollectionID(userId)

    const response = await fetch(`${url}/collection/${collectionID}/asset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "metadata": {
          "name": name,
          "description": description,
          "image": cid,
          "author": address
        },
      })
    });

    return response;
  }
}