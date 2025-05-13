"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessKeyService = void 0;
const common_1 = require("@nestjs/common");
const redis_pubsub_service_1 = require("../redis/redis.pubsub.service");
const uuid_1 = require("uuid");
let AccessKeyService = class AccessKeyService {
    redisPubSubService;
    keys = new Map();
    constructor(redisPubSubService) {
        this.redisPubSubService = redisPubSubService;
    }
    create(rateLimit, ttlMinutes) {
        const key = (0, uuid_1.v4)();
        const expiresAt = new Date(Date.now() + ttlMinutes * 60000);
        const accessKey = { key, rateLimit, expiresAt, active: true };
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
    getByKey(key) {
        return this.keys.get(key);
    }
    update(key, rateLimit, ttlMinutes) {
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
    delete(key) {
        this.redisPubSubService.publish('keyEvents', {
            type: 'delete',
            key: {
                key: key,
                rateLimit: '',
                expiresAt: '',
                active: true,
            },
        });
        return this.keys.delete(key);
    }
    disableKey(key) {
        const existing = this.keys.get(key);
        if (existing) {
            existing.active = false;
        }
    }
    list() {
        return Array.from(this.keys.values());
    }
};
exports.AccessKeyService = AccessKeyService;
exports.AccessKeyService = AccessKeyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_pubsub_service_1.RedisPubSubService])
], AccessKeyService);
//# sourceMappingURL=access-key.service.js.map