import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { SwapDto } from './dto/SwapDto';


@Injectable()
export class SwapCreator {

   async createSwapCall(swapData: SwapDto): Promise<any> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address


    const {assetID, collectionID, address} = swapData;

    const response = await fetch("http://localhost:3001/changeowner", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "assetID": assetID,
            "collectionID": collectionID,
            "address": address,
        })
    });

    return response;
  }
}