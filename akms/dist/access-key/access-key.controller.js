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
exports.AccessKeyController = void 0;
const common_1 = require("@nestjs/common");
const access_key_service_1 = require("./access-key.service");
let AccessKeyController = class AccessKeyController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getKey(key) {
        const keyData = await this.service.getByKey(key);
        if (!keyData) {
            throw new common_1.NotFoundException('Key not found');
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Key retrieved successfully',
            data: keyData,
        };
    }
    async disable(key) {
        const status = await this.service.disableKey(key);
        console.log("===========status", status);
        return {
            statusCode: common_1.HttpStatus.NO_CONTENT,
            message: 'Deleted successfully',
        };
    }
};
exports.AccessKeyController = AccessKeyController;
__decorate([
    (0, common_1.Get)(':key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessKeyController.prototype, "getKey", null);
__decorate([
    (0, common_1.Delete)(':key'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccessKeyController.prototype, "disable", null);
exports.AccessKeyController = AccessKeyController = __decorate([
    (0, common_1.Controller)('key'),
    __metadata("design:paramtypes", [access_key_service_1.AccessKeyService])
], AccessKeyController);
//# sourceMappingURL=access-key.controller.js.map