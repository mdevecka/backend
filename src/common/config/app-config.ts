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
  EVA_GALLERY_COLLECTION: string;
  EVA_GALLERY_WALLET_ADDRESS: string;
  NFT_MODULE_URL: string;
  WSS_PROVIDER: string;
}