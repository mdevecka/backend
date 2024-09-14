import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User, Artwork, Nft, Wallet,
  NftData
} from '../entities';

@Injectable()
export class NftRepository {
  private readonly logger = new Logger(NftRepository.name)

  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(Nft) private nfts: Repository<Nft>,
    @InjectRepository(Wallet) private wallets: Repository<Wallet>,
    @InjectRepository(Artwork) private artworks: Repository<Artwork>,

  ) { }

  //Returns user from database
  async getUser(userId: string) {
    return this.users.findOneBy({ id: userId });
  }

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
  async getWalletNFTs(walletAddress: string) {
    return this.nfts.find({
      relations: {
        wallet: true,
      },
      where: { wallet: { walletAddress: walletAddress } }
    });
  }

  //Returns boolean if NFT is an artwork
  async isArtworkNFT(artworkId: string): Promise<boolean> {
    const art = await this.artworks.findOneBy({ id: artworkId });
    return (art != null && art.nftId != null);
  }

  //Assigns NFT to specific artwork
  async artworkNFT(nft: Nft, artworkId: string) {
    return this.artworks.update(artworkId, { nft: nft });
  }

  //Returns NFT metadata
  async getNFTMetadata(nftId: string) {
    const nft = await this.nfts.findOneBy({ id: nftId });
    return nft?.nftData
  }

  //Creates NFT
  async createNFT(nft_data: NftData, walletId: string, artworkId: string) {
    const wallet = await this.wallets.findOneBy({ id: walletId });
    const artwork = await this.artworks.findOneBy({ id: artworkId });
    const nft = new Nft();
    nft.artwork = artwork;
    nft.wallet = wallet;
    nft.nftData = nft_data;

    return this.nfts.save(nft);
  }

  //Assign wallet to user - User can have multiple wallets
  async assignWallet(wallet: Wallet, userId: string) {
    const user = await this.users.findOneBy({ id: userId });
    wallet.user = user;

    return this.wallets.save(wallet);
  }

  //Changes the owner of NFT in database
  async changeOwner(nft: Nft, walletAddress: string) {
    const wallet = await this.wallets.findOneBy({ walletAddress: walletAddress });
    nft.wallet = wallet;

    return this.nfts.save(nft);
  }

  //Changes trialmint status to true
  async claimTrialMint(userId: string) {
    const user = await this.users.findOneBy({ id: userId });
    user.trialMintClaimed = true;
    await this.users.save(user);
  }

  //Get user associated with wallet
  async getUserByWallet(walletAddress: string) {
    const wallet = await this.wallets.findOne({
      where: { walletAddress },
      relations: ['user'],  // Include the 'user' relation
    });

    return wallet?.user;
  }

  //Mints NFT for user as trial mint by Eva Gallery wallet
  async trialMint(userId: string, artworkId: string, nft: NftData, EvaGalleryWallet: string) {
    const user = await this.users.findOneBy({ id: userId });
    const wallet = await this.wallets.findOneBy({ walletAddress: EvaGalleryWallet });
    const savedNFT = await this.createNFT(nft, wallet.id, artworkId);
    user.trialMint = savedNFT.id;
    await this.users.save(user);
  }

  //Assign user own collection ID
  async createUserCollection(userId: string, collectionID: string) {
    const user = await this.users.findOneBy({ id: userId });
    if (user.collectionID != null) {
      return null;
    }
    user.collectionID = collectionID;
    return this.users.save(user);
  }

  //Returns user collection ID
  async getUserCollectionID(userId: string) {
    const user = await this.users.findOneBy({ id: userId });
    return user.collectionID;
  }

  //Returns trial minted NFT id
  async getTrialMinted(userId: string) {
    const user = await this.users.findOneBy({ id: userId });
    return user.trialMint;
  }



  /// Assigns metadata that was queried from API
  async assignNFTsMetadata(userId: string, walletAddress: string, nfts: Response) {
    // Create new Wallet in DB if it doesn't exist
    let wallet = await this.wallets.findOneBy({ walletAddress: walletAddress });
    if (wallet == null) {
      const newWallet = new Wallet();
      newWallet.walletAddress = walletAddress;
      newWallet.user = await this.users.findOneBy({ id: userId });
      await this.wallets.save(newWallet);
      wallet = newWallet;
    }

    // Initialize nfts array if it's not already initialized
    if (wallet.nfts == null) {
      wallet.nfts = [];
    }

    const nfts_parsed = await nfts.json();

    const nftObjects = nfts_parsed.map(({ id, name, image, metadata }) => ({
      id,
      name,
      image,
      metadata
    }));

    // Parse data provided by API and assign name, description, and image to NFT
    for (const nftData of nftObjects) {
      const { id, name, metadata = null, image } = nftData;

      // Create a new NFT instance
      const nft = new Nft();
      nft.nftData = {
        id, // Assign the id to nftData
        name,
        metadata,
        image
      };
      nft.wallet = wallet;

      //Check if NFT exists
      if (await this.nfts.findOneBy({ nftData: nft.nftData }) != null) {
        this.logger.log(`NFT with id ${id} already exists in the database`);
      }
      else {
        // Save the NFT to the database and associate it with the wallet
        wallet.nfts.push(nft); // Push the NFT to the wallet's nfts array
        await this.nfts.save(nft); // Save the NFT to the database      
      }

    }
  }
}