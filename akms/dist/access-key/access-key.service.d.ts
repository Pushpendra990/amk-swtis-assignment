import { AccessKey } from './entities/access-key.entity';
import { RedisPubSubService } from '../redis/redis.pubsub.service';
export declare class AccessKeyService {
    private readonly redisPubSubService;
    private keys;
    constructor(redisPubSubService: RedisPubSubService);
    create(rateLimit: number, ttlMinutes: number): AccessKey;
    getByKey(key: string): AccessKey | undefined;
    update(key: string, rateLimit: number, ttlMinutes: number): AccessKey | undefined;
    delete(key: string): boolean;
    disableKey(key: string): void;
    list(): AccessKey[];
}
