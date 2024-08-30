import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';
import { MemoryStoredFile } from 'nestjs-form-data';
import { create } from 'ipfs-http-client';

@Injectable()
export class MintCreator {

  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository) {

  }

  async createMint(file: MemoryStoredFile, name: string, description: string, userId: string): Promise<Response> {
    //First we check if user has the right to mint an NFT, if they have already minted an NFT we return 400
    //If they haven't we create the NFT for them

    const user = await this.nftRepository.getUser(userId);
    if (user.trialMint != null) {
      return null;
    }

    const url = this.configService.get("NFT_MODULE_URL");

    const collectionID = this.configService.get("EVA_GALLERY_COLLECTION")

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


    const response = await fetch(url + "/generatenft", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "metadata": {
          "name": name,
          "description": description,
          "ipfs": cid
        },
        "collectionID": collectionID
      })
    });

    //Create Api instance
    const wsProvider = new WsProvider('wss://westmint-rpc-tn.dwellir.com');
    const api = await ApiPromise.create({ provider: wsProvider });


    //Create the NFT
    const resp = await response.json();

    //Create wallet instance
    const wallet = new Keyring({ type: 'sr25519' });
    const secretKey = this.configService.get("WALLET_SECRET_KEY");
    const EvaGallerySigner = wallet.addFromUri(secretKey);

    //Sign and send the transaction also subscribe to the status of the transaction
    return new Promise((resolve, reject) => {
      api.tx(resp).signAndSend(EvaGallerySigner, ({ status, dispatchError, txHash }) => {
        if (status.isFinalized) {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { docs, name, section } = decoded;
              reject(new Error(`${section}.${name}: ${docs.join(' ')}`));
            } else {
              reject(new Error(dispatchError.toString()));
            }
          } else {
            // No dispatch error, transaction should be successful
            const result = new Response(
              JSON.stringify({ txHash: txHash.toString() }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
            resolve(result);
          }
        }
      });
    });
  }

}