import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from '@modules/config/app-config.service';
import { Artwork, ArtworkImageId } from '@modules/app-db/entities';
import { ProcessImageDataDto } from './contracts';

@Injectable()
export class HttpApiService {

  private readonly get = this.http.axiosRef.get;
  private readonly post = this.http.axiosRef.post;
  private readonly patch = this.http.axiosRef.patch;
  private readonly baseUrl: string;

  constructor(private config: AppConfigService, private http: HttpService) {
    this.baseUrl = this.config.aiModuleUrl;
  }

  async processImage(artwork: Artwork) {
    const data: ProcessImageDataDto = {
      id: artwork.image.id,
      aiGenerated: artwork.aiGeneratedStatus,
      metadata: {
        name: artwork.name ?? undefined,
        description: artwork.description ?? undefined,
        artist: artwork.artist.name ?? undefined,
        year: artwork.year ?? undefined,
        artworkGenre: artwork.artworkGenre.name ?? undefined,
        artworkMaterial: artwork.artworkMaterial.name ?? undefined,
        artworkTechnique: artwork.artworkTechnique.name ?? undefined,
        artworkWorktype: artwork.artworkWorktype.name ?? undefined,
        measurements: artwork.measurements ?? undefined,
      }
    };
    const formData = new FormData();
    const imageBlob = new Blob([artwork.image.buffer], { type: artwork.image.mimeType });
    formData.set('image', imageBlob);
    formData.set('json', JSON.stringify(data));
    await this.post(`${this.baseUrl}/image/process`, formData);
  }

  async searchQuery(query: string, count: number, page: number) {
    return this.get<ArtworkImageId[]>(`${this.baseUrl}/image/search_query`, {
      params: { query, count, page }
    }).then(r => r.data);
  }

  async searchImage(imageId: ArtworkImageId, count: number, page: number) {
    return this.get<ArtworkImageId[]>(`${this.baseUrl}/image/search_image`, {
      params: { image_id: imageId, count, page }
    }).then(r => r.data);
  }

}
