import { OnModuleInit } from '@nestjs/common';
import { TokenService } from '../token/token.service';
export declare class RedisSubscriberService implements OnModuleInit {
    private readonly tokenService;
    private publisher;
    private subscriber;
    constructor(tokenService: TokenService);
    onModuleInit(): Promise<void>;
    subscribe(channel: string, callback: (message: any) => void): Promise<void>;
}
