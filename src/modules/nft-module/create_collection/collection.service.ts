import { Injectable, Logger } from '@nestjs/common';
import '@polkadot/api-augment';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { MemoryStoredFile } from 'nestjs-form-data';
import { create } from 'ipfs-http-client';

@Injectable()
export class CollectionCreator {
  private readonly logger = new Logger(CollectionCreator.name)
  constructor(private configService: ConfigService<AppConfig>) {
  }

  async createCollectionCall(file: MemoryStoredFile, name: string, description: string, address: string): Promise<string> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they have, skip this function and return nothing
    //If they haven't, we create a collection for them

    let cid = null
    let cidMeta = null
    let body = null;

    if (file != null) {
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

        if (cid == null) {
          body = JSON.stringify({ "name": name, "description": description });
        }
        else if (description == null) {
          body = JSON.stringify({ "name": name, "image": cid.path });
        }
        else if (description == null && cid == null) {
          body = JSON.stringify({ "name": name });
        }
        else {
          body = JSON.stringify({ "name": name, "image": cid.path, "description": description });
        }

        cidMeta = await client.add(body)
      } catch (error) {
        this.logger.error('Error adding file to IPFS:', error);
        throw new Error('Failed to add file to IPFS');
      }
    }

    const url = this.configService.get("NFT_MODULE_URL");


    if (cid == null) {
      body = JSON.stringify({
        "owner": address,
        "metadata": cidMeta.path
      });
    }
    else if (description == null) {
      body = JSON.stringify({
        "owner": address,
        "metadata": cidMeta.path

      });
    }
    else if (description == null && cid == null) {
      body = JSON.stringify({
        "owner": address,
        "metadata": cidMeta.path
      });
    }
    else {
      body = JSON.stringify({
        "owner": address,
        "metadata": cidMeta.path
      });
    }

    const response = await fetch(`${url}/collection`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    return await response.json();
  }
}