import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AdminRepository } from '@modules/app-db/repositories';
import { AppConfig } from '@common/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { urlCombine } from '@common/helpers';

const callbackRoute = "admin/google/login/callback";

interface GoogleProfile {
  provider: 'google',
  id: string;
  email: string;
  displayName: string;
  verified: boolean;
  picture: string;
}

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  verified: boolean;
  picture: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private config: ConfigService<AppConfig>, private adminRepository: AdminRepository) {
    super({
      clientID: config.get("GOOGLE_CLIENT_ID") ?? "-",
      clientSecret: config.get("GOOGLE_CLIENT_SECRET") ?? "",
      callbackURL: urlCombine(config.get("AUTH_CALLBACK_DOMAIN") ?? "", callbackRoute),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) {
    const user: GoogleUser = {
      id: profile.id,
      email: profile.email,
      name: profile.displayName,
      picture: profile.picture,
      verified: profile.verified,
    };
    done(null, user);
  }

}
