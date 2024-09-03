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

  async createSwapCall(swapData: SwapDto, collectionID: string, assetID: string): Promise<string> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWallet(swapData.address);

    if (user.trialMintClaimed == true) {
      return null;
    }

    const url = this.configService.get("NFT_MODULE_URL");

    const { address } = swapData;

    const response = await fetch(`${url}/transfer/collection/${collectionID}/asset/${assetID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "address": address,
      })
    });

    return response.toString();
  }

  async swapNFTOwnershipInDB(address: string): Promise<void> {
    //We change ownership of NFT in database
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWallet(address);

    if (user.trialMintClaimed == true) {
      return;
    }

    const EvaGalleryWalletAddress = this.configService.get("EVA_GALLERY_WALLET_ADDRESS");
    const nft = await this.nftRepo.getWalletNFTs(EvaGalleryWalletAddress);

    for (let i = 0; i < nft.length; i++) {
      if (nft[i].nftData.id == user.trialMint) {
        await this.nftRepo.changeOwner(nft[i], address);
        await this.nftRepo.claimTrialMint(user.id);
        return;
      }
    }
  }
}