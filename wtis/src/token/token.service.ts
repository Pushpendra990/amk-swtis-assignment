
import { Injectable } from '@nestjs/common';


@Injectable()
export class TokenService {
  
  private keyStore = new Map<string, any>();
  private rateLimiter = new Map<string, { count: number; lastChecked: number }>();
  
  // Mock token data
  private tokenData = {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    price: 64000
  };

  validateKey(key: string): string | null {
    const k = this.keyStore.get(key);
    if (!k) return 'Invalid key';
    if (!k.active) return 'Key disabled';
    if (new Date() > new Date(k.expiresAt)) return 'Key expired';
    return null;
  }

  isRateLimited(key: string, rateLimit: number): boolean {
    const current = this.rateLimiter.get(key) || { count: 0, lastChecked: Date.now() };
    const now = Date.now();
    if (now - current.lastChecked > 60000) {
      this.rateLimiter.set(key, { count: 1, lastChecked: now });
      return false;
    }
    if (current.count >= rateLimit) return true;
    current.count++;
    this.rateLimiter.set(key, current);
    return false;
  }

  async getTokenInfo(key: string) {
    const keyInfo = this.keyStore.get(key);
    const error = this.validateKey(key);
    if (error) return { error };

    if (this.isRateLimited(key, keyInfo.rateLimit)) return { error: 'Rate limit exceeded' };
    return this.tokenData;
  }

  // Handler for events from AKMS
  updateKeyStore(event: any) {
    if (event.type === 'create' || event.type === 'update') {
      this.keyStore.set(event.key.key, event.key);
    } else if (event.type === 'delete') {
      this.keyStore.delete(event.key.key);
    }
  }
}
