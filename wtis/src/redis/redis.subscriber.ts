import { Injectable, OnModuleInit } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisSubscriberService implements OnModuleInit {
    private publisher: RedisClient;
    private subscriber: RedisClient;
  constructor(
    private readonly tokenService: TokenService,
  ) {
    
    this.publisher = new Redis();    // Defaults to localhost:6379
    this.subscriber = new Redis();   // Separate connection for subscriptions


  }

  async onModuleInit() {
    await this.subscribe('keyEvents', (data) => {
       this.tokenService.updateKeyStore(data);
    });

   
  }
  async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (ch, msg) => {
      if (ch === channel) {
        try {
          const data = JSON.parse(msg);
          callback(data);
        } catch (err) {
          console.error('Invalid JSON in Redis message:', err);
        }
      }
    });
  }
}
