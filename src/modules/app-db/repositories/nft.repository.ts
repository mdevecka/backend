import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User, Artwork, Nft, Wallet
} from '../entities';

@Injectable()
export class NftRepository {

  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Nft) private nfts: Repository<Nft>,
    @InjectRepository(Wallet) private wallets: Repository<Wallet>,
    @InjectRepository(Artwork) private artworks: Repository<Artwork>,

  ) { }

  async getUsers() {
    return this.users.find();
  }
}
