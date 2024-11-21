export interface AppConfig {
  PORT: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  SESSION_LIFETIME: string;
  LOG_REQUESTS: string;
  NFT_MODULE_URL: string;
  SUBSCAN_URL: string;
}