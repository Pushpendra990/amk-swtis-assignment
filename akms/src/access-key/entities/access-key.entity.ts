// src/access-key/entities/access-key.entity.ts
export class AccessKey {
  key: string;
  rateLimit: number; // per minute
  expiresAt: Date;
  active: boolean;
}
