import { Controller, Post, Put, Patch, Delete, Param, NotFoundException, BadRequestException, ParseUUIDPipe, UseGuards, Body } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { Image, ArtworkImage, UserId, ArtistId, ArtworkId, GalleryId, ExhibitionId, UnityRoomId } from '@modules/app-db/entities';
import { AdminRepository } from '@modules/app-db/repositories';
import { SessionAuthGuard, GetUserId } from '@modules/auth/helpers';
import {
  CreateArtistDto, UpdateArtistDto, CreateArtworkDto, UpdateArtworkDto,
  CreateGalleryDto, UpdateGalleryDto, CreateExhibitionDto, UpdateExhibitionDto,
  SaveDesignerRoomDto
} from '../contracts/admin/write';
import { mapEmpty } from '@common/helpers';
import { randomUUID } from 'crypto';

@UseGuards(SessionAuthGuard)
@Controller('admin')
export class AdminWriteController {

  constructor(private adminRepository: AdminRepository) {
  }

  @Post('artist/create')
  @FormDataRequest()
  async createArtist(@Body() dto: CreateArtistDto, @GetUserId() userId: UserId) {
    if (await this.adminRepository.getArtistByName(userId, dto.name) != null)
      throw new BadRequestException("name must be unique");
    const artist = await this.adminRepository.saveArtist({
      name: dto.name,
      born: dto.born,
      biography: dto.biography,
      public: dto.public,
      countryId: dto.countryId,
      artistCategoryId: mapEmpty(dto.artistCategoryId, id => id),
      userId: userId,
      avatar: mapEmpty(dto.avatar, image => ({ buffer: image.buffer, mimeType: image.mimeType }), Image.empty),
    });
    return { id: artist.id };
  }

  @Patch('artist/update/:id')
  @FormDataRequest()
  async updateArtist(@Param('id', ParseUUIDPipe) id: ArtistId, @Body() dto: UpdateArtistDto, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasArtist(userId, id))
      throw new NotFoundException();
    const otherArtist = (dto.name != null) ? await this.adminRepository.getArtistByName(userId, dto.name) : null;
    if (otherArtist != null && otherArtist.id !== id)
      throw new BadRequestException("name must be unique");
    await this.adminRepository.saveArtist({
      id: id,
      name: dto.name,
      born: dto.born,
      biography: dto.biography,
      public: dto.public,
      countryId: dto.countryId,
      artistCategoryId: mapEmpty(dto.artistCategoryId, id => id),
      avatar: mapEmpty(dto.avatar, image => ({ buffer: image.buffer, mimeType: image.mimeType }), Image.empty),
    });
  }

  @Delete('artist/delete/:id')
  async deleteArtist(@Param('id', ParseUUIDPipe) id: ArtistId, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasArtist(userId, id))
      throw new NotFoundException();
    await this.adminRepository.removeArtist(id);
  }

  @Post('artwork/create')
  @FormDataRequest()
  async createArtwork(@Body() dto: CreateArtworkDto, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasArtist(userId, dto.artistId))
      throw new BadRequestException("artist does not exist");
    if (dto.exhibitions != null && dto.exhibitions !== "" && !await this.adminRepository.hasExhibitions(userId, dto.exhibitions))
      throw new BadRequestException("exhibition does not exist");
    if (await this.adminRepository.getArtworkByName(dto.artistId, dto.name) != null)
      throw new BadRequestException("name must be unique");
    const artwork = await this.adminRepository.saveArtwork({
      name: dto.name,
      description: dto.description,
      year: dto.year,
      tags: dto.tags,
      public: dto.public,
      measurements: dto.measurements,
      aiMode: dto.aiMode,
      artistId: dto.artistId,
      artworkGenreId: mapEmpty(dto.artworkGenreId, id => id),
      artworkWorktypeId: mapEmpty(dto.artworkWorktypeId, id => id),
      artworkMaterialId: mapEmpty(dto.artworkMaterialId, id => id),
      artworkTechniqueId: mapEmpty(dto.artworkTechniqueId, id => id),
      exhibitions: mapEmpty(dto.exhibitions, (list) => list.map(id => ({ id })), []),
      image: mapEmpty(dto.image, image => ({ id: randomUUID(), buffer: image.buffer, mimeType: image.mimeType }), ArtworkImage.empty),
      protectedImage: (dto.image !== undefined) ? ArtworkImage.empty : undefined,
    });
    return { id: artwork.id };
  }

  @Patch('artwork/update/:id')
  @FormDataRequest()
  async updateArtwork(@Param('id', ParseUUIDPipe) id: ArtworkId, @Body() dto: UpdateArtworkDto, @GetUserId() userId: UserId) {
    const artwork = await this.adminRepository.getArtwork(userId, id);
    if (artwork == null)
      throw new NotFoundException();
    if (await this.adminRepository.artworkHasNft(id))
      throw new BadRequestException("nft artwork cannot be directly changed");
    if (dto.artistId != null && !await this.adminRepository.hasArtist(userId, dto.artistId))
      throw new BadRequestException("artist does not exist");
    if (dto.exhibitions != null && dto.exhibitions !== "" && !await this.adminRepository.hasExhibitions(userId, dto.exhibitions))
      throw new BadRequestException("exhibition does not exist");
    const artistId = dto.artistId ?? artwork.artistId;
    const otherArtwork = (dto.name != null) ? await this.adminRepository.getArtworkByName(artistId, dto.name) : null;
    if (otherArtwork != null && otherArtwork.id !== id)
      throw new BadRequestException("name must be unique");
    await this.adminRepository.saveArtwork({
      id: id,
      name: dto.name,
      description: dto.description,
      year: dto.year,
      tags: dto.tags,
      public: dto.public,
      measurements: dto.measurements,
      aiMode: dto.aiMode,
      artistId: dto.artistId,
      artworkGenreId: mapEmpty(dto.artworkGenreId, id => id),
      artworkWorktypeId: mapEmpty(dto.artworkWorktypeId, id => id),
      artworkMaterialId: mapEmpty(dto.artworkMaterialId, id => id),
      artworkTechniqueId: mapEmpty(dto.artworkTechniqueId, id => id),
      exhibitions: mapEmpty(dto.exhibitions, (list) => list.map(id => ({ id })), []),
      image: mapEmpty(dto.image, image => ({ id: randomUUID(), buffer: image.buffer, mimeType: image.mimeType }), ArtworkImage.empty),
      protectedImage: (dto.image !== undefined) ? ArtworkImage.empty : undefined,
    });
  }

  @Delete('artwork/delete/:id')
  async deleteArtwork(@Param('id', ParseUUIDPipe) id: ArtworkId, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasArtwork(userId, id))
      throw new NotFoundException();
    await this.adminRepository.removeArtwork(id);
  }

  @Post('gallery/create')
  @FormDataRequest()
  async createGallery(@Body() dto: CreateGalleryDto, @GetUserId() userId: UserId) {
    if (await this.adminRepository.getGalleryByName(userId, dto.name) != null)
      throw new BadRequestException("name must be unique");
    const gallery = await this.adminRepository.saveGallery({
      name: dto.name,
      description: dto.description,
      address: dto.address,
      countryId: dto.countryId,
      gps: dto.gps,
      public: dto.public,
      userId: userId,
    });
    return { id: gallery.id };
  }

  @Patch('gallery/update/:id')
  @FormDataRequest()
  async updateGallery(@Param('id', ParseUUIDPipe) id: GalleryId, @Body() dto: UpdateGalleryDto, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasGallery(userId, id))
      throw new NotFoundException();
    const otherGallery = (dto.name != null) ? await this.adminRepository.getGalleryByName(userId, dto.name) : null;
    if (otherGallery != null && otherGallery.id !== id)
      throw new BadRequestException("name must be unique");
    await this.adminRepository.saveGallery({
      id: id,
      name: dto.name,
      description: dto.description,
      address: dto.address,
      countryId: dto.countryId,
      gps: dto.gps,
      public: dto.public,
    });
  }

  @Delete('gallery/delete/:id')
  async deleteGallery(@Param('id', ParseUUIDPipe) id: GalleryId, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasGallery(userId, id))
      throw new NotFoundException();
    await this.adminRepository.removeGallery(id);
  }

  @Post('exhibition/create')
  @FormDataRequest()
  async createExhibition(@Body() dto: CreateExhibitionDto, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasGallery(userId, dto.galleryId))
      throw new BadRequestException("gallery does not exist");
    if (await this.adminRepository.getExhibitionByName(dto.galleryId, dto.name) != null)
      throw new BadRequestException("name must be unique");
    if (dto.activeRoomId != null && !await this.adminRepository.hasRoom(userId, dto.activeRoomId))
      throw new BadRequestException("room does not exist");
    if (dto.artworks != null && dto.artworks !== "" && !await this.adminRepository.hasArtworks(userId, dto.artworks))
      throw new BadRequestException("artwork does not exist");
    const exhibition = await this.adminRepository.saveExhibition({
      name: dto.name,
      fromDate: mapEmpty(dto.fromDate, date => new Date(date)),
      toDate: mapEmpty(dto.toDate, date => new Date(date)),
      curator: dto.curator,
      public: dto.public,
      galleryId: dto.galleryId,
      activeRoomId: mapEmpty(dto.activeRoomId, id => id),
      artworks: mapEmpty(dto.artworks, (list) => list.map(id => ({ id })), []),
    });
    return { id: exhibition.id };
  }

  @Patch('exhibition/update/:id')
  @FormDataRequest()
  async updateExhibition(@Param('id', ParseUUIDPipe) id: ExhibitionId, @Body() dto: UpdateExhibitionDto, @GetUserId() userId: UserId) {
    const exhibition = await this.adminRepository.getExhibition(userId, id);
    if (exhibition == null)
      throw new NotFoundException();
    if (dto.galleryId != null && !await this.adminRepository.hasGallery(userId, dto.galleryId))
      throw new BadRequestException("gallery does not exist");
    if (dto.artworks != null && dto.artworks !== "" && !await this.adminRepository.hasArtworks(userId, dto.artworks))
      throw new BadRequestException("artwork does not exist");
    if (dto.activeRoomId != null && !await this.adminRepository.hasRoom(userId, dto.activeRoomId))
      throw new BadRequestException("room does not exist");
    const galleryId = dto.galleryId ?? exhibition.galleryId;
    const otherExhibition = (dto.name != null) ? await this.adminRepository.getExhibitionByName(galleryId, dto.name) : null;
    if (otherExhibition != null && otherExhibition.id !== id)
      throw new BadRequestException("name must be unique");
    await this.adminRepository.saveExhibition({
      id: id,
      name: dto.name,
      fromDate: mapEmpty(dto.fromDate, date => new Date(date)),
      toDate: mapEmpty(dto.toDate, date => new Date(date)),
      curator: dto.curator,
      public: dto.public,
      galleryId: dto.galleryId,
      activeRoomId: mapEmpty(dto.activeRoomId, id => id),
      artworks: mapEmpty(dto.artworks, (list) => list.map(id => ({ id })), []),
    });
  }

  @Delete('exhibition/delete/:id')
  async deleteExhibition(@Param('id', ParseUUIDPipe) id: ExhibitionId, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasExhibition(userId, id))
      throw new NotFoundException();
    await this.adminRepository.removeExhibition(id);
  }

  @Put('designer/room/save')
  async saveDesignerRoom(@Body() dto: SaveDesignerRoomDto, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.canUseRoomId(userId, dto.id))
      throw new BadRequestException("invalid room id");
    if (!await this.adminRepository.hasExhibition(userId, dto.exhibitionId))
      throw new BadRequestException("exhibition does not exist");
    const artworkIds = dto.walls.flatMap(w => [w.artworkId, ...w.images.map(i => i.artworkId)]);
    if (!await this.adminRepository.hasArtworks(userId, artworkIds))
      throw new BadRequestException("artwork does not exist");
    await this.adminRepository.saveRoom({
      id: dto.id,
      name: dto.name,
      x: dto.x,
      y: dto.y,
      width: dto.width,
      height: dto.height,
      length: dto.length,
      exhibitionId: dto.exhibitionId,
      walls: dto.walls.map(wall => ({
        x: wall.x,
        y: wall.y,
        z: wall.z,
        rotation: wall.rotation,
        width: wall.width,
        height: wall.height,
        thick: wall.thick,
        color: wall.color,
        opacity: wall.opacity,
        artworkId: wall.artworkId,
        images: wall.images.map(image => ({
          x: image.x,
          y: image.y,
          scale: image.scale,
          artworkId: image.artworkId,
        }))
      })),
      lamps: dto.lamps.map(lamp => ({
        x: lamp.x,
        y: lamp.y,
        z: lamp.z,
        range: lamp.range,
        shadow: lamp.shadow,
      })),
      items: dto.items.map(item => ({
        x: item.x,
        y: item.y,
        z: item.z,
        rotation: item.rotation,
        itemTypeId: item.itemTypeId,
      })),
    });
  }

  @Delete('designer/room/delete/:id')
  async deleteRoom(@Param('id', ParseUUIDPipe) id: UnityRoomId, @GetUserId() userId: UserId) {
    if (!await this.adminRepository.hasRoom(userId, id))
      throw new NotFoundException();
    await this.adminRepository.removeRoom(id);
  }

}
