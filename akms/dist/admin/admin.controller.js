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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const access_key_service_1 = require("../access-key/access-key.service");
const dotenv = require('dotenv');
dotenv.config();
const ADMIN_SECRET = 'ADCBDCKDL1213242ddfldfdlfdl33434';
let AdminController = class AdminController {
    accessKeyService;
    constructor(accessKeyService) {
        this.accessKeyService = accessKeyService;
    }
    isAdmin(headers) {
        return headers['authorization'] === `Bearer ${ADMIN_SECRET}`;
    }
    async createKey(body, headers) {
        if (!this.isAdmin(headers)) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const key = await this.accessKeyService.create(body.rateLimit, body.ttlMinutes);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Key created successfully',
            data: key,
        };
    }
    async updateKey(key, body, headers) {
        if (!this.isAdmin(headers)) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const updatedKey = await this.accessKeyService.update(key, body.rateLimit, body.ttlMinutes);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Key updated successfully',
            data: updatedKey,
        };
    }
    async deleteKey(key, headers) {
        if (!this.isAdmin(headers)) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        await this.accessKeyService.delete(key);
        return {
            statusCode: common_1.HttpStatus.NO_CONTENT,
            message: 'Key deleted successfully',
        };
    }
    async list(headers) {
        if (!this.isAdmin(headers)) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const keys = await this.accessKeyService.list();
        return {
            statusCode: common_1.HttpStatus.OK,
            data: keys,
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('key'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createKey", null);
__decorate([
    (0, common_1.Put)('key/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateKey", null);
__decorate([
    (0, common_1.Delete)('key/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteKey", null);
__decorate([
    (0, common_1.Get)('keys'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "list", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [access_key_service_1.AccessKeyService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map