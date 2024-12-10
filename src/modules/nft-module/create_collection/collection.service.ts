import { Injectable, Logger } from '@nestjs/common';
import { AppConfigService } from '@modules/config/app-config.service';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class CollectionCreator {

  private readonly logger = new Logger(CollectionCreator.name)

  constructor(private configService: AppConfigService) {
  }

  async createCollectionCall(file: MemoryStoredFile, name: string, description: string, address: string): Promise<string> {
    //We check in database if user have already created a collection (If there is collection ID in their user profile)
    //If they have, skip this function and return nothing
    //If they haven't, we create a collection for them

    const formData = new FormData();
    const fileBlob = new Blob([file.buffer], { type: file.mimetype });

    // Append fields and files to the FormData object
    formData.append('file', fileBlob);          // Ensure 'file' is a File or Blob object
    formData.append('name', name);
    formData.append('metadata', description);
    formData.append('owner', address);

    const url = this.configService.nftModuleUrl;

    const response = await fetch(`${url}/collection/create`, {
      method: 'PUT',
      body: formData
    });

    return await response.json();
  }
}