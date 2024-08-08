import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { NftDto } from './dto/NFTDto';


@Injectable()
export class nftCreator {

   async createNFTCall(nft: NftDto): Promise<any> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they have, skip this function and return nothing
    //If they haven't, we create a collection for them
    

    //TBA Upload collection image to IPFS here for the fetch below
    const ipfs = "IPFS image link";

    const {metadata, address} = nft;
    const {name, description} = metadata;
    const collectionID = 1 //TBA Fetch from DB to get users collection ID also add check if user has a collection ID

    const response = await fetch("http://localhost:3001/generatenft", {
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
            "address": address,
            "collectionID": collectionID
        })
    });

    return response;
  }
}