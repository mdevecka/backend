import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AdminRepository } from '@modules/app-db/repositories';
import { User } from '@modules/app-db/entities';
import { OptionDto } from '../contracts/admin';
import * as mapper from '../contracts/admin/mapper';

function mapAsync<T, S>(list: Promise<T[]>, mapper: (item: T) => S): Promise<S[]> {
  return list.then(items => items.map(mapper));
}

function mapOptionsAsync(list: Promise<{ id: string, name: string }[]>): Promise<OptionDto[]> {
  return mapAsync(list, mapper.createOptionDto);
}

@Controller('admin')
export class AdminController {

  private currentUser: User;

  constructor(private adminRepository: AdminRepository) {
  }

  async onModuleInit() {
    const users = await this.adminRepository.getUsers();
    this.currentUser = users[0];
  }

  @Get('user')
  async getUser() {
    return mapper.createUserDto(this.currentUser);
  }

  @Get('artist')
  async getArtists() {
    return mapAsync(this.adminRepository.getArtists(this.currentUser.id), mapper.createArtistDto);
  }

  @Get('artwork')
  async getArtworks() {
    return mapAsync(this.adminRepository.getArtworks(this.currentUser.id), mapper.createArtworkDto);
  }

  @Get('gallery')
  async getGalleries() {
    return mapAsync(this.adminRepository.getGalleries(this.currentUser.id), mapper.createGalleryDto);
  }

  @Get('exhibition')
  async getExhibitions() {
    return mapAsync(this.adminRepository.getExhibitions(this.currentUser.id), mapper.createExhibitionDto);
  }

  @Get('artist/:id')
  async getArtistDetail(@Param('id') id: string) {
    const artist = await this.adminRepository.getArtistDetail(this.currentUser.id, id);
    if (artist == null)
      throw new NotFoundException();
    return mapper.createArtistDetailDto(artist);
  }

  @Get('artwork/:id')
  async getArtworkDetail(@Param('id') id: string) {
    const artwork = await this.adminRepository.getArtworkDetail(this.currentUser.id, id);
    if (artwork == null)
      throw new NotFoundException();
    return mapper.createArtworkDetailDto(artwork);
  }

  @Get('gallery/:id')
  async getGalleryDetail(@Param('id') id: string) {
    const gallery = await this.adminRepository.getGalleryDetail(this.currentUser.id, id);
    if (gallery == null)
      throw new NotFoundException();
    return mapper.createGalleryDetailDto(gallery);
  }

  @Get('exhibition/:id')
  async getExhibitionDetail(@Param('id') id: string) {
    const exhibition = await this.adminRepository.getExhibitionDetail(this.currentUser.id, id);
    if (exhibition == null)
      throw new NotFoundException();
    return mapper.createExhibitionDetailDto(exhibition);
  }

  @Get('artwork/:id/exhibition')
  async getArtworkExhibitions(@Param('id') id: string) {
    return mapAsync(this.adminRepository.getArtworkExhibitions(this.currentUser.id, id), mapper.createArtworkExhibitionDto);
  }

  @Get('exhibition/:id/artwork')
  async getExhibitionArtworks(@Param('id') id: string) {
    return mapAsync(this.adminRepository.getExhibitionArtworks(this.currentUser.id, id), mapper.createExhibitionArtworkDto);
  }

  @Get('artist/:id/artwork')
  async getArtistArtworks(@Param('id') id: string) {
    return mapAsync(this.adminRepository.getArtistArtworks(this.currentUser.id, id), mapper.createArtistArtworkDto);
  }

  @Get('gallery/:id/exhibition')
  async getGalleryExhibitions(@Param('id') id: string) {
    return mapAsync(this.adminRepository.getGalleryExhibitions(this.currentUser.id, id), mapper.createGalleryExhibitionDto);
  }

  @Get('options/country')
  async getCountryOptions() {
    return mapOptionsAsync(this.adminRepository.getCountryOptions());
  }

  @Get('options/artist_category')
  async getArtistCategoryOptions() {
    return mapOptionsAsync(this.adminRepository.getArtistCategoryOptions());
  }

  @Get('options/artwork_category')
  async getArtworkCategoryOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkCategoryOptions());
  }

  @Get('options/artwork_technique')
  async getArtworkTechniqueOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkTechniqueOptions());
  }

  @Get('options/artwork_material')
  async getArtworkMaterialOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkMaterialOptions());
  }

  @Get('options/artwork_genre')
  async getArtworkGenreOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkGenreOptions());
  }

  @Get('options/artwork_worktype')
  async getArtworkWorktypeOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkWorktypeOptions());
  }

  @Get('options/gallery')
  async getGalleryOptions() {
    return mapOptionsAsync(this.adminRepository.getGalleryOptions(this.currentUser.id));
  }

  @Get('options/artwork')
  async getArtworkOptions() {
    return mapOptionsAsync(this.adminRepository.getArtworkOptions(this.currentUser.id));
  }

  @Get('options/artist')
  async getArtistOptions() {
    return mapOptionsAsync(this.adminRepository.getArtistOptions(this.currentUser.id));
  }

  @Get('options/exhibition')
  async getExhibitionOptions() {
    return mapOptionsAsync(this.adminRepository.getExhibitionOptions(this.currentUser.id));
  }

}
