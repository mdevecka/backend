import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { NftRepository } from '@modules/app-db/repositories';
import { AppConfigService } from '@modules/config/config.service';


export enum SwapStatus {
  Success = 'Success',
  Failed = 'Failed'
}

@Injectable()
export class SwapCreator {
  constructor(private nftRepo: NftRepository, private configService: ConfigService<AppConfig>, private appConfigService: AppConfigService) {

  }

  async createSwapCall(accountAddress: string, assetID: string, userId: string): Promise<SwapStatus> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWallet(accountAddress);
    const nft = await this.nftRepo.getNFT(assetID);

    let nftID = nft.nftData.id;
    //Split the collection and nft id
    const ids = nftID.split("-");
    nftID = ids[1];

    //These checks might need to be changed in the future when we allow users to transfer ownership within APP.
    if (user == null || user.trialMintClaimed == false || user.trialMintPaid == false || user.trialMintId == null || user.id != userId) {
      return SwapStatus.Failed;
    }
    console.log("WQIEJQW")

    const url = this.configService.get("NFT_MODULE_URL");
    const collectionID = this.appConfigService.collectionId;

    const response = await fetch(`${url}/transfer/collection/${collectionID}/asset/${nftID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "address": accountAddress,
      })
    });
  
    return SwapStatus.Success;
  }

  async getPayCall(address: string, userId: string): Promise<string> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address
    const user = await this.nftRepo.getUser(userId);
    if (user == null || user.trialMintClaimed == true || user.trialMintPaid == true || user.trialMintId == null || user.id != userId) {
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

  async trialMintPaidinDB(address: string): Promise<void> {
    //We change ownership of NFT in database
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address

    const user = await this.nftRepo.getUserByWallet(address);

    //These checks might need to be changed in the future when we allow users to transfer ownership within APP.
    if (user == null || user.trialMintClaimed == true || user.trialMintPaid == true) {
      return null;
    }

    await this.nftRepo.payTrialMint(user.id);
  }

  async swapNFTOwnershipInDB(address: string): Promise<SwapStatus> {
    //We change ownership of NFT in database
    await this.trialMintPaidinDB(address);
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address
    const user = await this.nftRepo.getUserByWallet(address);
    //These checks might need to be changed in the future when we allow users to transfer ownership within APP.
    if (user == null || user.trialMintClaimed == true || user.trialMintPaid == false || user.trialMintId == null) {
      return SwapStatus.Failed;
    }

    await this.nftRepo.changeOwner(user.trialMintId, address);
    await this.nftRepo.claimTrialMint(user.id);
    return SwapStatus.Success;
  }
}