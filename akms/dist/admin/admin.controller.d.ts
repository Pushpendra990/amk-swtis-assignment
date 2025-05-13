import { HttpStatus } from '@nestjs/common';
import { AccessKeyService } from '../access-key/access-key.service';
export declare class AdminController {
    private readonly accessKeyService;
    constructor(accessKeyService: AccessKeyService);
    private isAdmin;
    createKey(body: any, headers: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../access-key/entities/access-key.entity").AccessKey;
    }>;
    updateKey(key: string, body: any, headers: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("../access-key/entities/access-key.entity").AccessKey | undefined;
    }>;
    deleteKey(key: string, headers: any): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    list(headers: any): Promise<{
        statusCode: HttpStatus;
        data: import("../access-key/entities/access-key.entity").AccessKey[];
    }>;
}
