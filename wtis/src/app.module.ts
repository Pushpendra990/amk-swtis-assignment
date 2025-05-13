import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './token/token.controller'
import { TokenService } from './token/token.service'
import { RedisSubscriberService } from './redis/redis.subscriber'


@Module({
  imports: [],
  controllers: [AppController, TokenController],
  providers: [AppService, TokenService, RedisSubscriberService],
 
})
export class AppModule {}
