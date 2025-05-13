import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisPubSubService implements OnModuleInit {
  private publisher: RedisClient;
  private subscriber: RedisClient;

  constructor() {
    this.publisher = new Redis();    
    this.subscriber = new Redis();
  }

  async onModuleInit() {

  }

  async publish(channel: string, message: any): Promise<number> {
    const payload = typeof message === 'string' ? message : JSON.stringify(message);
    return this.publisher.publish(channel, payload);
  }

}
