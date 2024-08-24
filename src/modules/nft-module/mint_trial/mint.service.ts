import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';
import { MemoryStoredFile } from 'nestjs-form-data';


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

    //TBA Upload image to IPFS here for the fetch below
    const ipfs = "IPFS image link";


    const response = await fetch(url + "/generatenft", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "metadata": {
          "name": name,
          "description": description,
          "ipfs": ipfs
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