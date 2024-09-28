import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@common/config';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class CollectionCreator {
  private readonly logger = new Logger(CollectionCreator.name)
  constructor(private configService: ConfigService<AppConfig>) {
  }

  async createCollectionCall(file: MemoryStoredFile, name: string, description: string, address: string): Promise<string> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they have, skip this function and return nothing
    //If they haven't, we create a collection for them

    const body = {
      file: file,
      name: name,
      metadata: description,
      owner: address
    }

    const url = this.configService.get("NFT_MODULE_URL");

    const response = await fetch(`${url}/collection`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return await response.json();
  }
}