"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
let TokenService = class TokenService {
    keyStore = new Map();
    rateLimiter = new Map();
    tokenData = {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        price: 64000
    };
    validateKey(key) {
        const k = this.keyStore.get(key);
        if (!k)
            return 'Invalid key';
        if (!k.active)
            return 'Key disabled';
        if (new Date() > new Date(k.expiresAt))
            return 'Key expired';
        return null;
    }
    isRateLimited(key, rateLimit) {
        const current = this.rateLimiter.get(key) || { count: 0, lastChecked: Date.now() };
        const now = Date.now();
        if (now - current.lastChecked > 60000) {
            this.rateLimiter.set(key, { count: 1, lastChecked: now });
            return false;
        }
        if (current.count >= rateLimit)
            return true;
        current.count++;
        this.rateLimiter.set(key, current);
        return false;
    }
    async getTokenInfo(key) {
        const keyInfo = this.keyStore.get(key);
        const error = this.validateKey(key);
        if (error)
            return { error };
        if (this.isRateLimited(key, keyInfo.rateLimit))
            return { error: 'Rate limit exceeded' };
        return this.tokenData;
    }
    updateKeyStore(event) {
        if (event.type === 'create' || event.type === 'update') {
            this.keyStore.set(event.key.key, event.key);
        }
        else if (event.type === 'delete') {
            console.log("========", event.key.key);
            this.keyStore.delete(event.key.key);
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)()
], TokenService);
//# sourceMappingURL=token.service.js.map