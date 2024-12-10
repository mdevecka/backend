import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AdminRepository } from '@modules/app-db/repositories';
import { LoginType, RegisterState } from '@modules/app-db/entities';
import { AppConfigService } from '@modules/config/app-config.service';
import { compare } from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {

  constructor(private config: AppConfigService, private adminRepository: AdminRepository, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async loginWithCredentials(email: string, password: string) {
    const user = await this.adminRepository.getUserByEmail(email, LoginType.Credentials);
    if (user == null)
      throw new UnauthorizedException();
    const validPassword = await compare(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException();
    const sessionId = this.createSession();
    await this.storeSession(sessionId, user.id);
    return sessionId;
  }

  async loginWithProvider(id: string, loginType: LoginType) {
    if (id == null || id === "")
      throw new Error(`unexpected empty provider id`);
    const user = await this.adminRepository.getUserByProviderId(id, loginType);
    if (user == null)
      throw new Error(`user not found`);
    if (user.registerState === RegisterState.Registering)
      throw new Error(`user not registered`);
    const sessionId = this.createSession();
    await this.storeSession(sessionId, user.id);
    return sessionId;
  }

  async logout(sessionId: string) {
    await this.removeSession(sessionId);
  }

  async getSessionUserId(sessionId: string) {
    return this.cacheManager.get<string>(this.getSessionKey(sessionId));
  }

  async refreshSession(sessionId: string, userId: string) {
    await this.storeSession(sessionId, userId);
  }

  private async storeSession(sessionId: string, userId: string) {
    const sessionLifetime = this.config.sessionLifetime * 1000;
    await this.cacheManager.set(this.getSessionKey(sessionId), userId, sessionLifetime);
  }

  private async removeSession(sessionId: string) {
    await this.cacheManager.del(this.getSessionKey(sessionId));
  }

  private getSessionKey(sessionId: string) {
    return `SESSION_${sessionId}`;
  }

  private createSession() {
    return randomBytes(16).toString('base64');
  }

}
