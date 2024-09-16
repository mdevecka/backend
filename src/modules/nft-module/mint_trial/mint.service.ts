import { Injectable, Logger } from '@nestjs/common';
import '@polkadot/api-augment';
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';
import { NftData } from '@modules/app-db/entities';
import { create } from 'ipfs-http-client';

@Injectable()
export class MintCreator {
  private readonly logger = new Logger(MintCreator.name)
  constructor(private configService: ConfigService<AppConfig>, private nftRepository: NftRepository) {

  }

  async createMint(userId: string, artworkId: string): Promise<Response> {
    //First we check if user has the right to mint an NFT, if they have already minted an NFT we return null
    //If they haven't we create the NFT for them

    const user = await this.nftRepository.getUser(userId);
    const artwork = await this.nftRepository.getArtwork(artworkId);

    if (!user && !artwork && user.trialMintClaimed == true && user.trialMint != null && user.trialMint != 'null') {
      return null;
    }

    const url = this.configService.get("NFT_MODULE_URL");
    const collectionID = this.configService.get("EVA_GALLERY_COLLECTION")
    const EvaGalleryWalletAddress = this.configService.get("EVA_GALLERY_WALLET_ADDRESS");


    let cid = null
    let metadataCid = null

    try {
      const IPFS_NODE_URL = this.configService.get("IPFS_URL");
      const username = this.configService.get("IPFS_NAME");
      const password = this.configService.get("IPFS_PASSWORD");


      //Create metadata
      const metadata = JSON.stringify({
        description: artwork.description,
        artist: artwork.artist,
        year: artwork.year,
        artworkGenre: artwork.artworkGenre,
        artworkMaterial: artwork.artworkMaterial,
        artworkTechnique: artwork.artworkTechnique,
        artworkWorktype: artwork.artworkWorktype,
        measurements: artwork.measurements,
      });

      const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
      const client = create({
        url: IPFS_NODE_URL,
        headers: {
          authorization: auth,
        },
      });
      cid = await client.add(artwork.image.buffer);
      metadataCid = await client.add(metadata);
    } catch (error) {
      this.logger.error('Error adding file to IPFS:', error);
      throw new Error('Failed to add file to IPFS');
    }

    

    const response = await fetch(`${url}/collection/${collectionID}/asset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "meta": {
          "name": artwork.name,
          "metadata": metadataCid.path,
          "image": cid.path,
          "author": EvaGalleryWalletAddress
        },
      })
    });

    //Create Api instance
    const wsProvider = new WsProvider(this.configService.get("WSS_PROVIDER"));
    const api = await ApiPromise.create({ provider: wsProvider });


    //Create the NFT
    const resp = await response.json();
    const resp_clone = resp;

    //Deconstruct hex encoded response clone to get NFT (aka ItemID)
    const nftTX = api.tx(resp_clone)
    const nftTx = await nftTX.args.toString();
    const parsedResponse = JSON.parse(nftTx); // Convert the string to a JSON object
    const nftID = parsedResponse[0].args.item;

    //Create wallet instance
    const wallet = new Keyring({ type: 'sr25519' });
    const secretKey = this.configService.get("WALLET_SECRET_KEY");
    const EvaGallerySigner = wallet.addFromUri(secretKey);
    //Sign and send the transaction also subscribe to the status of the transaction
    new Promise((reject) => {
      api.tx(resp).signAndSend(EvaGallerySigner, async ({ status, dispatchError }) => {
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
            // No dispatch error, transaction should be successful, add to DB
            const nft: NftData = {
              id: `${collectionID}-${nftID}`,
              name: artwork.name,
              metadata: metadataCid.path,
              image: cid.path
            }


            await this.nftRepository.trialMint(user.id, artworkId, nft, EvaGalleryWalletAddress)
            return;
          }
        }
      });
    });
  }

}