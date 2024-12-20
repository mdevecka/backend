import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app-config';
import { parseBool } from '@common/helpers';

@Injectable()
export class AppConfigService {

  private readonly logger = new Logger(AppConfigService.name)

  get port() { return parseInt(this.configService.get("PORT")) || 3000; }
  get frontendUrl() { return this.configService.get("FRONTEND_URL"); }
  get allowLocalhostRequests() { return parseBool(this.configService.get("ALLOW_LOCALHOST_REQUESTS")) ?? false; }
  get forceSameSiteNone() { return parseBool(this.configService.get("FORCE_SAMESITE_NONE")) ?? false; }
  get postgresHost() { return this.configService.get("POSTGRES_HOST"); }
  get postgresPort() { return parseInt(this.configService.get("POSTGRES_PORT")); }
  get postgresUser() { return this.configService.get("POSTGRES_USER"); }
  get postgresPassword() { return this.configService.get("POSTGRES_PASSWORD"); }
  get postgresDatabase() { return this.configService.get("POSTGRES_DATABASE"); }
  get sessionLifetime() { return parseInt(this.configService.get("SESSION_LIFETIME")) || 600; }
  get logRequests() { return parseBool(this.configService.get("LOG_REQUESTS")) ?? false; }
  get nftModuleUrl() { return this.configService.get("NFT_MODULE_URL"); }
  get kodadotUrl() { return this.configService.get("KODADOT_URL"); }
  get subscanUrl() { return this.configService.get("SUBSCAN_URL"); }
  get authCallbackDomain() { return this.configService.get("AUTH_CALLBACK_DOMAIN", ""); }
  get authFailureRoute() { return this.configService.get("AUTH_FAILURE_ROUTE", ""); }
  get authCreateUserRoute() { return this.configService.get("AUTH_CREATE_USER_ROUTE", ""); }
  get authResetUserRoute() { return this.configService.get("AUTH_RESET_USER_ROUTE", ""); }
  get googleClientId() { return this.configService.get("GOOGLE_CLIENT_ID", "-"); }
  get googleClientSecret() { return this.configService.get("GOOGLE_CLIENT_SECRET", ""); }
  get googleEmail() { return this.configService.get("GOOGLE_EMAIL"); }
  get googleEmailRefreshToken() { return this.configService.get("GOOGLE_EMAIL_REFRESH_TOKEN"); }
  get googleMailbox() { return this.configService.get("GOOGLE_MAILBOX"); }
  get aiModuleUrl() { return this.configService.get("AI_MODULE_URL"); }
  get aiAccessTokenSecret() { return this.configService.get("AI_ACCESS_TOKEN_SECRET"); }
  get staticFileRoot() { return this.configService.get("STATIC_FILE_ROOT"); }

  constructor(protected configService: ConfigService<AppConfig>) {
  }

}
