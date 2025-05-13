import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccessKeyController } from './access-key/access-key.controller';
import { AccessKeyService } from './access-key/access-key.service';
import { AdminController } from './admin/admin.controller';
import { RedisPubSubService } from './redis/redis.pubsub.service'
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AccessKeyController, AdminController],
  providers: [AppService, AccessKeyService, RedisPubSubService],
  exports:[RedisPubSubService]
})
export class AppModule {}
