import { HttpStatus } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';
export declare class AccessKeyController {
    private readonly service;
    constructor(service: AccessKeyService);
    getKey(key: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/access-key.entity").AccessKey;
    }>;
    disable(key: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
