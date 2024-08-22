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

  //Returns user associated wallets
  async getUserWallets(userId: string) {
    return this.wallets.find({
      relations: {
        user: true,
      },
      where: { user: { id: userId } }
    });
  }
  
  //Returns all NFTs associated with a wallet address
  async getWalletNFTs(walletId: string) {
    return this.nfts.find({
      relations: {
        wallet: true,
      },
      where: { wallet: { id: walletId } }
    });
  }

  //Returns boolean if NFT is an artwork
  async isArtworkNFT(artworkId: string): Promise<boolean> {
    const art = await this.artworks.findOneBy({ id: artworkId });
    if (art && art.isNft === true) {
      return true;
    } else {
      return false;
    }
  }

  //Assigns NFT to specific artwork
  async artworkNFT(nft: Nft, artworkId: string) {
    this.artworks.update(artworkId, { nft: nft });
    return this.artworks.update(artworkId, { isNft: true });
  }

  //Returns NFT metadata
  async getNFTMetadata(nftId: string) {
    const nft = this.nfts.findOneBy({ id: nftId });
    return (await nft).nftData
  }

  //Creates NFT
  async createNFT(nft: Nft, walletId: string, artworkId: string) {
    const wallet = await this.wallets.findOneBy({ id: walletId });
    const artwork = await this.artworks.findOneBy({ id: artworkId });
    nft.artwork = artwork;
    artwork.isNft = true;
    artwork.nft = nft;
    wallet.nfts.push(nft);
    nft.wallet = wallet;

    await this.wallets.save(wallet);
    await this.artworks.save(artwork);
    return this.nfts.save(nft);
  }

  //Assign wallet to user - User can have multiple wallets
  async assignWallet(wallet: Wallet, userId: string) {
    const user = await this.users.findOneBy({ id: userId });
    wallet.user = user;
    user.wallets.push(wallet);

    await this.users.save(user);
    return this.wallets.save(wallet);
  }

  //Changes the owner of NFT in database
  async changeOwner( nft: Nft, walletId: string) {
    const wallet = await this.wallets.findOneBy({ id: walletId });
    nft.wallet = wallet;
    wallet.nfts.push(nft);

    await this.wallets.save(wallet);
    return this.nfts.save(nft);
  }

  //Mints NFT for user as trial mint by Eva Gallery wallet
  async trialMint( userId: string, artworkId: string ,nft: Nft, EvaGalleryWallet: Wallet) {
    const user = await this.users.findOneBy({ id: userId });
    const savedNFT = await this.createNFT(nft, EvaGalleryWallet.id, artworkId);
    user.trialMint = savedNFT.id;
    await this.users.save(user); 
  }

  //Assign user own collection ID
  async createUserCollection( userId: string, collectionID: number){
    const user = await this.users.findOneBy({ id: userId });
    user.collectionID = collectionID;
    return this.users.save(user);
  }

  //Returns user collection ID
  async getUserCollectionID( userId: string){
    const user = await this.users.findOneBy({ id: userId });
    return user.collectionID;
  }

  //Returns trial minted NFT id
  async getTrialMinted(userId: string){
    const user = await this.users.findOneBy({ id: userId });
    return user.trialMint;
  }

  //Assigns metadata that was queried from API
  async assignNFTsMetadata(userId: string, walletAddress: string, nfts: Nft[]){
    //Create new NFT in DB and increase index
    for (let i = 0; i < nfts.length; i++) {
      if(!this.wallets.findOneBy({ walletAddress: walletAddress })){
        const newWallet = new Wallet();
        newWallet.walletAddress = walletAddress;
        newWallet.user = await this.users.findOneBy({
          id: userId
        });
        await this.assignWallet(newWallet, userId);
      }
      const wallet = await this.wallets.findOneBy({ walletAddress: walletAddress });
      var nft: Nft;
      nft.nftData = nfts[i].nftData;
      nft.wallet = wallet;

      wallet.nfts.push(nft);
      await this.nfts.save(nfts[i]);
    }
  }
}
