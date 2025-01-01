import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { AppConfigService } from '@modules/config/app-config.service';
import { Artwork, ArtworkImageId } from '@modules/app-db/entities';
import { AiArtworkMetadata } from './contracts';

function unwrapAxiosError<T, S extends any[]>(func: (...args: S) => Promise<T>) {
  return (...args: S) => func(...args).catch((err: Error) => {
    if (err instanceof AxiosError) {
      throw err.toJSON();
    }
    throw err;
  });
}

@Injectable()
export class HttpApiService {

  private readonly get = unwrapAxiosError(this.http.axiosRef.get);
  private readonly post = unwrapAxiosError(this.http.axiosRef.post);
  private readonly patch = unwrapAxiosError(this.http.axiosRef.patch);
  private readonly baseUrl: string;

  constructor(private config: AppConfigService, private http: HttpService) {
    this.baseUrl = this.config.aiModuleUrl;
  }

  async processImage(artwork: Artwork) {
    const formData = new FormData();
    const imageBlob = new Blob([artwork.image.buffer], { type: artwork.image.mimeType });
    const metadata: AiArtworkMetadata = {
      name: artwork.name ?? undefined,
      description: artwork.description ?? undefined,
      artist: artwork.artist.name ?? undefined,
      year: artwork.year ?? undefined,
      artworkGenre: artwork.artworkGenre?.name ?? undefined,
      artworkMaterial: artwork.artworkMaterial?.name ?? undefined,
      artworkTechnique: artwork.artworkTechnique?.name ?? undefined,
      artworkWorktype: artwork.artworkWorktype?.name ?? undefined,
      measurements: artwork.measurements ?? undefined,
    };
    formData.set('image', imageBlob);
    formData.set('image_uuid', artwork.image.id);
    formData.set('ai_generated_status', artwork.aiGeneratedStatus);
    formData.set('metadata', JSON.stringify(metadata));
    await this.post(`${this.baseUrl}/image/process`, formData);
  }

  async setImagePublic(ids: ArtworkImageId[]) {
    await this.patch(`${this.baseUrl}/image/set-public`, ids);
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
