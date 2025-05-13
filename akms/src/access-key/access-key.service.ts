// src/access-key/access-key.service.ts
import { Injectable } from '@nestjs/common';
import { AccessKey } from './entities/access-key.entity';
import { RedisPubSubService } from '../redis/redis.pubsub.service'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccessKeyService {
  private keys = new Map<string, AccessKey>();
    constructor(private readonly redisPubSubService: RedisPubSubService) {}


  create(rateLimit: number, ttlMinutes: number): AccessKey {
    const key = uuidv4();
    const expiresAt = new Date(Date.now() + ttlMinutes * 60000);
    const accessKey: AccessKey = { key, rateLimit, expiresAt, active: true };
    this.keys.set(key, accessKey);
    this.redisPubSubService.publish('keyEvents', {
      type: 'create',
      key: {
        key: key,
        rateLimit: rateLimit,
        expiresAt: expiresAt,
        active: true,
      },
    });
    return accessKey;
  }

  getByKey(key: string): AccessKey | undefined {
    return this.keys.get(key);
  }

  update(key: string, rateLimit: number, ttlMinutes: number) {
    const existing = this.keys.get(key);
    if (existing) {
      existing.rateLimit = rateLimit;
      existing.expiresAt = new Date(Date.now() + ttlMinutes * 60000);
      this.redisPubSubService.publish('keyEvents', {
          type: 'update',
          key: {
            key: key,
            rateLimit: rateLimit,
            expiresAt: existing.expiresAt,
            active: true,
          },
        });
      return existing;
    }
    return undefined;
  }

  delete(key: string) {
    
    this.redisPubSubService.publish('keyEvents', {
      type: 'delete',
      key:{
            key: key,
            rateLimit: '',
            expiresAt: '',
            active: true,
          },
    });
    return this.keys.delete(key);
  }

  disableKey(key: string) {
    const existing = this.keys.get(key);
    if (existing) {
      existing.active = false;
    }
  }

  list(): AccessKey[] {
    return Array.from(this.keys.values());
  }
}
