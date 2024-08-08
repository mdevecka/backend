import { Injectable } from '@nestjs/common';
import '@polkadot/api-augment';
import { CollectionDto } from './dto/CollectionDto';


@Injectable()
export class collectionCreator {

   async createCollectionCall(collection: CollectionDto): Promise<any> {
    //TBA We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they have, skip this function and return nothing
    //If they haven't, we create a collection for them


    //TBA Upload collection image to IPFS here for the fetch below
    const ipfs = "IPFS image link";

    const {metadata, address} = collection;
    const {name, description} = metadata;

    const response = await fetch("http://localhost:3001/generatecol", {
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
        })
    });

    return response;
  }
}