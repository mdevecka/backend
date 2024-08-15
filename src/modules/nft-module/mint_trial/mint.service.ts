import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
//import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'
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
    const url = this.configService.get("NFT_MODULE_URL");
    const users = await this.nftRepository.getUsers();
    console.log(users);

    const collectionID = 1 //TBA This will be hardcoded value but has to be set to actual collection that will be created

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
    //const wsProvider = new WsProvider('wss://westmint-rpc-tn.dwellir.com');
    //const api = await ApiPromise.create({ provider: wsProvider });


    //Create the NFT
    //const resp = await response.json();
    //const tx = api.tx(resp)

    //Create wallet instance
    //const wallet = new Keyring({ type: 'sr25519' });
    //const secretKey = this.configService.get("WALLET_SECRET_KEY");
    //const alice = wallet.addFromUri(secretKey);

    //Sign and send the transaction also subscribe to the status of the transaction
    //const hash = await tx.signAndSend(alice);
    return response;
    //TBA Add subscription to notifications 

    //If NFT minting is successful return 200 else return 400

  }

}