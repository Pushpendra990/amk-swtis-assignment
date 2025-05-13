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
exports.RedisSubscriberService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../token/token.service");
const ioredis_1 = require("ioredis");
let RedisSubscriberService = class RedisSubscriberService {
    tokenService;
    publisher;
    subscriber;
    constructor(tokenService) {
        this.tokenService = tokenService;
        this.publisher = new ioredis_1.default();
        this.subscriber = new ioredis_1.default();
    }
    async onModuleInit() {
        await this.subscribe('keyEvents', (data) => {
            this.tokenService.updateKeyStore(data);
        });
    }
    async subscribe(channel, callback) {
        await this.subscriber.subscribe(channel);
        this.subscriber.on('message', (ch, msg) => {
            if (ch === channel) {
                try {
                    const data = JSON.parse(msg);
                    callback(data);
                }
                catch (err) {
                    console.error('Invalid JSON in Redis message:', err);
                }
            }
        });
    }
};
exports.RedisSubscriberService = RedisSubscriberService;
exports.RedisSubscriberService = RedisSubscriberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], RedisSubscriberService);
//# sourceMappingURL=redis.subscriber.js.map