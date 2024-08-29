export interface AppConfig {
  PORT: string;
  FRONTEND_URL: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  SESSION_LIFETIME: string;
  LOG_REQUESTS: string;
  WALLET_SECRET_KEY: string;
  NFT_MODULE_URL: string;
  EVA_GALLERY_COLLECTION: string;
  IPFS_URL: string;
  IPFS_NAME: string;
  IPFS_PASSWORD: string;
}