import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { SwapDto } from './dto/SwapDto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class SwapCreator {
  constructor(private nftRepo: NftRepository, private configService: ConfigService<AppConfig>) {

  }

  async createSwapCall(swapData: SwapDto, collectionID: string, assetID: string): Promise<Response> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUser(swapData.address);

    if (user.trialMintClaimed == true) {
      return null;
    }

    const url = this.configService.get("NFT_MODULE_URL");

    const { address } = swapData;

    const response = await fetch(url + "/transfer/collection/" + collectionID.toString() + "/asset/" + assetID.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "address": address,
      })
    });

    return response;
  }

  async swapNFTOwnershipInDB(EvaGalleryCollection: string, assetID: string, address: string) {
    //We change ownership of NFT in database
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUser(address);

    if (user.trialMintClaimed == true) {
      return null;
    }

    const nft = await this.nftRepo.getWalletNFTs(EvaGalleryCollection);

    for (let i = 0; i < nft.length; i++) {
      if (nft[i].id == assetID) {
        const owner = await this.nftRepo.changeOwner(nft[i], address);
        if (owner) {
          return owner;
        }
        else {
          return null;
        }
      }
    }
    return null;
  }
}