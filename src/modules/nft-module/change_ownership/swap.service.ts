import { Injectable } from '@nestjs/common';
import { SwapDto } from './dto/SwapDto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';

@Injectable()
export class SwapCreator {
  constructor(private nftRepo: NftRepository, private configService: ConfigService<AppConfig>) {

  }

  async createSwapCall(swapData: SwapDto, collectionID: string, assetID: string, userId: string): Promise<string> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWalletTrial(swapData.address);

    //These checks might need to be changed in the future when we allow users to transfer ownership within APP.
    if (!user || user.trialMintClaimed == true || user.trialMintPaid == false || user.trialMint.id == null || user.id != userId) {
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

    return response.text();
  }

  async getPayCall(address: string, userId: string): Promise<string> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWallet(address);

    if (!user || user.trialMintClaimed == true || user.trialMintPaid == true || user.trialMint.id == null || user.id != userId) {
      return null;
    }

    //These checks might need to be changed in the future when we allow users to transfer ownership within APP.

    const url = this.configService.get("NFT_MODULE_URL");

    const response = await fetch(`${url}/pay/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  }

  async trialMintPaidinDB(address): Promise<void> {
    //We change ownership of NFT in database
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWallet(address);

    //These checks might need to be changed in the future when we allow users to transfer ownership within APP.
    if (!user || user.trialMintClaimed == true || user.trialMintPaid == true) {
      return null;
    }

    await this.nftRepo.payTrialMint(user.id);
  }

  async swapNFTOwnershipInDB(address: string, userId: string): Promise<void> {
    //We change ownership of NFT in database
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWallet(address);

    //These checks might need to be changed in the future when we allow users to transfer ownership within APP.
    if (!user || user.trialMintClaimed == true || user.trialMint == null || user.id != userId) {
      return null;
    }

    await this.nftRepo.changeOwner(user.trialMint, address);
    await this.nftRepo.claimTrialMint(user.id);
    return;
  }
}