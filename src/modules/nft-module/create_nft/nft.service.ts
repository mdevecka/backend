import { Injectable, Logger } from '@nestjs/common';
import '@polkadot/api-augment';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { MemoryStoredFile } from 'nestjs-form-data';
import { create } from 'ipfs-http-client';
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class NftCreator {
  private readonly logger = new Logger(NftCreator.name)
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository) {

  }

  async createNFTCall(file: MemoryStoredFile, name: string, metadata: string, address: string, userId: string): Promise<string> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they didnt return null and do nothing

    if (await this.nftRepository.getUserCollectionID(userId) == null) {
      return null
    }

    let cid = null

    try {
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
      cid = await client.add(file.buffer);
    } catch (error) {
      this.logger.error('Error adding file to IPFS:', error);
      throw new Error('Failed to add file to IPFS');
    }

    const url = this.configService.get("NFT_MODULE_URL");

    const collectionID = await this.nftRepository.getUserCollectionID(userId)
    this.logger.log(collectionID);
    const response = await fetch(`${url}/collection/${collectionID}/asset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "meta": {
          "name": name,
          "metadata": metadata,
          "image": cid.path,
          "author": address
        },
      })
    });
    return await response.json();
  }
}