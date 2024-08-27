import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AdminRepository } from '@modules/app-db/repositories';
import { AppConfig } from '@common/config';
import { compare } from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {

  constructor(private config: ConfigService<AppConfig>, private adminRepository: AdminRepository, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async login(email: string, password: string) {
    const user = await this.adminRepository.getUserByEmail(email);
    if (user == null)
      throw new UnauthorizedException();
    const validPassword = await compare(password, user.password);
    if (!validPassword)
      throw new UnauthorizedException();
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
    const sessionLifetime = parseInt(this.config.get("SESSION_LIFETIME")) * 1000;
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
