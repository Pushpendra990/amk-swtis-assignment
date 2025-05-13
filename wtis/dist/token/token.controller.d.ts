import { HttpStatus } from '@nestjs/common';
import { TokenService } from './token.service';
export declare class TokenController {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    getToken(key: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: string;
            symbol: string;
            name: string;
            price: number;
        } | {
            error: string;
        };
    }>;
}
