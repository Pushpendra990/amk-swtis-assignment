import { OnModuleInit } from '@nestjs/common';
export declare class RedisPubSubService implements OnModuleInit {
    private publisher;
    private subscriber;
    constructor();
    onModuleInit(): Promise<void>;
    publish(channel: string, message: any): Promise<number>;
}
