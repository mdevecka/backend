import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { SwapDto } from './dto/SwapDto';
import {ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';

@Injectable()
export class SwapCreator {
    constructor(private configService: ConfigService<AppConfig>) {

    }

   async createSwapCall(swapData: SwapDto): Promise<Response> {
    //We check if user has the right to change ownership of the NFT, if they haven't already claimed their NFT and if they 
    //havent then create call to change ownership of NFT to their desired address
    const url = this.configService.get("NFT_MODULE_URL");

    const {assetID, collectionID, address} = swapData;

    const response = await fetch(url+"/changeowner", {
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