export interface AppConfig {
  PORT: string;
  FRONTEND_URL: string;
  ALLOW_LOCALHOST_REQUESTS: string;
  FORCE_SAMESITE_NONE: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  SESSION_LIFETIME: string;
  LOG_REQUESTS: string;
  NFT_MODULE_URL: string;
  KODADOT_URL: string;
  SUBSCAN_URL: string;
  AUTH_CALLBACK_DOMAIN: string;
  AUTH_FAILURE_ROUTE: string;
  AUTH_CREATE_USER_ROUTE: string;
  AUTH_RESET_USER_ROUTE: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_EMAIL: string;
  GOOGLE_EMAIL_REFRESH_TOKEN: string;
  GOOGLE_MAILBOX: string;
  AI_MODULE_URL: string;
  AI_ACCESS_TOKEN_SECRET: string;
}
