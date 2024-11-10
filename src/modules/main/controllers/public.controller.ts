import { Controller, Get, Query, ParseIntPipe, ParseUUIDPipe, Param, Response, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { PublicRepository, MAX_SEED } from '@modules/app-db/repositories';
import { ArtworkId, ResourceId, UnityRoomId } from '@modules/app-db/entities';
import { mapAsync } from '@common/helpers';
import { randomInt } from 'crypto';
import * as mapper from '../contracts/public/mapper';

@Controller('public')
export class PublicController {

  constructor(private publicRepository: PublicRepository) {
  }

  @Get('random/artist')
  async getRandomArtists(@Query('seed', new ParseIntPipe({ optional: true })) seed = this.createSeed(), @Query('from', new ParseIntPipe({ optional: true })) from = 0, @Query('count', ParseIntPipe) count: number) {
    return mapAsync(this.publicRepository.getRandomArtists(seed, from, count), mapper.createArtistDto);
  }

  @Get('random/artwork')
  async getRandomArtworks(@Query('seed', new ParseIntPipe({ optional: true })) seed = this.createSeed(), @Query('from', new ParseIntPipe({ optional: true })) from = 0, @Query('count', ParseIntPipe) count: number) {
    return mapAsync(this.publicRepository.getRandomArtworks(seed, from, count), mapper.createArtworkDto);
  }

  @Get('random/gallery')
  async getRandomGalleries(@Query('seed', new ParseIntPipe({ optional: true })) seed = this.createSeed(), @Query('from', new ParseIntPipe({ optional: true })) from = 0, @Query('count', ParseIntPipe) count: number) {
    return mapAsync(this.publicRepository.getRandomGalleries(seed, from, count), mapper.createGalleryDto);
  }

  @Get('random/exhibition')
  async getRandomExhibitions(@Query('seed', new ParseIntPipe({ optional: true })) seed = this.createSeed(), @Query('from', new ParseIntPipe({ optional: true })) from = 0, @Query('count', ParseIntPipe) count: number) {
    return mapAsync(this.publicRepository.getRandomExhibitions(seed, from, count), mapper.createExhibitionDto);
  }

  @Get('random/nft')
  async getRandomNfts(@Query('seed', new ParseIntPipe({ optional: true })) seed = this.createSeed(), @Query('from', new ParseIntPipe({ optional: true })) from = 0, @Query('count', ParseIntPipe) count: number) {
    return mapAsync(this.publicRepository.getRandomNfts(seed, from, count), mapper.createNftDto);
  }

  @Get('artist')
  async getArtistDetail(@Query('slug') slug: string) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 2)
      throw new BadRequestException('invalid slug');
    const artist = await this.publicRepository.getArtistDetailBySlug(labels[0], labels[1]);
    if (artist == null)
      throw new NotFoundException();
    return mapper.createArtistDetailDto(artist);
  }

  @Get('artwork')
  async getArtworkDetail(@Query('slug') slug: string) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 3)
      throw new BadRequestException('invalid slug');
    const artwork = await this.publicRepository.getArtworkDetailBySlug(labels[0], labels[1], labels[2]);
    if (artwork == null)
      throw new NotFoundException();
    return mapper.createArtworkDetailDto(artwork);
  }

  @Get('gallery')
  async getGalleryDetail(@Query('slug') slug: string) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 2)
      throw new BadRequestException('invalid slug');
    const gallery = await this.publicRepository.getGalleryDetailBySlug(labels[0], labels[1]);
    if (gallery == null)
      throw new NotFoundException();
    return mapper.createGalleryDetailDto(gallery);
  }

  @Get('exhibition')
  async getExhibitionDetail(@Query('slug') slug: string) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 3)
      throw new BadRequestException('invalid slug');
    const exhibition = await this.publicRepository.getExhibitionDetailBySlug(labels[0], labels[1], labels[2]);
    if (exhibition == null)
      throw new NotFoundException();
    return mapper.createExhibitionDetailDto(exhibition);
  }

  @Get('artwork/image')
  async getArtworkImage(@Query('slug') slug: string, @Response() res: ExpressResponse) {
    if (slug == null)
      throw new BadRequestException('invalid slug');
    const labels = slug.split('/');
    if (labels.length !== 3)
      throw new BadRequestException('invalid slug');
    let item = await this.publicRepository.getArtworkProtectedImageBySlug(labels[0], labels[1], labels[2]);
    if (item == null) {
      item = await this.publicRepository.getArtworkImageBySlug(labels[0], labels[1], labels[2]);
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
    const item = await this.publicRepository.getArtworkThumbnailBySlug(labels[0], labels[1], labels[2]);
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

  @Get('resource/:id/content')
  async getResourceContent(@Param('id', ParseUUIDPipe) id: ResourceId, @Response() res: ExpressResponse) {
    const item = await this.publicRepository.getResourceContent(id);
    if (item == null)
      throw new NotFoundException();
    res.set({ "Content-Type": item.mimeType }).send(item.data);
  }

  @Get('designer/room/:id')
  async getDesignerRoom(@Param('id', ParseUUIDPipe) id: UnityRoomId) {
    const room = await this.publicRepository.getDesignerRoom(id);
    if (room == null)
      throw new NotFoundException();
    return mapper.createDesignerRoomDto(room);
  }

  @Get('designer/library')
  async getDesignerItemLibrary() {
    return mapAsync(this.publicRepository.getItemTypes(), mapper.createDesignerLibraryItemDto);
  }

  private createSeed() {
    return randomInt(MAX_SEED);
  }

}
