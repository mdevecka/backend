import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AdminRepository } from '@modules/app-db/repositories';
import { AppConfigService } from '@modules/config/app-config.service';
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

  constructor(private config: AppConfigService, private adminRepository: AdminRepository) {
    super({
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: urlCombine(config.authCallbackDomain, callbackRoute),
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
