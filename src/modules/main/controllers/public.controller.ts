import { Controller, Get, Query, ParseIntPipe, ParseUUIDPipe, Param, Response, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { PublicRepository, MAX_SEED } from '@modules/app-db/repositories';
import { ArtworkId } from '@modules/app-db/entities';
import { mapAsync } from '@common/helpers';
import { randomInt } from 'crypto';
import * as mapper from '../contracts/public/mapper';

@Controller('public')
export class PublicController {

  constructor(private publicRepository: PublicRepository) {
  }

  @Get('random/artwork')
  async getRandomArtworks(@Query('seed', new ParseIntPipe({ optional: true })) seed = this.createSeed(), @Query('from', new ParseIntPipe({ optional: true })) from = 0, @Query('count', ParseIntPipe) count: number) {
    return mapAsync(this.publicRepository.getRandomArtworks(seed, from, count), mapper.createArtworkDto);
  }

  @Get('artwork')
  async getArtworkDetail(@Query('slug') slug: string) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 3)
      throw new BadRequestException('invalid slug');
    const artwork = await this.publicRepository.getArtworkDetail(labels[0], labels[1], labels[2]);
    if (artwork == null)
      throw new NotFoundException();
    return mapper.createArtworkDetailDto(artwork);
  }

  @Get('artwork/image')
  async getArtworkImage(@Query('slug') slug: string, @Response() res: ExpressResponse) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 3)
      throw new BadRequestException('invalid slug');
    let item = await this.publicRepository.getArtworkProtectedImage(labels[0], labels[1], labels[2]);
    if (item == null) {
      item = await this.publicRepository.getArtworkImage(labels[0], labels[1], labels[2]);
      if (item == null)
        throw new NotFoundException();
    }
    res.set({ "Content-Type": item.mimeType }).send(item.image);
  }

  @Get('artwork/thumbnail')
  async getArtworkThumbnail(@Query('slug') slug: string, @Response() res: ExpressResponse) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 3)
      throw new BadRequestException('invalid slug');
    const item = await this.publicRepository.getArtworkThumbnail(labels[0], labels[1], labels[2]);
    if (item == null)
      throw new NotFoundException();
    res.set({ "Content-Type": item.mimeType }).send(item.image);
  }

  @Get('artwork/:id/unity-image')
  async getArtworkUnityImage(@Param('id', ParseUUIDPipe) id: ArtworkId, @Response() res: ExpressResponse) {
    const item = await this.publicRepository.getArtworkUnityImage(id);
    if (item == null)
      throw new NotFoundException();
    res.set({ "Content-Type": item.mimeType }).send(item.image);
  }

  private createSeed() {
    return randomInt(MAX_SEED);
  }

}
