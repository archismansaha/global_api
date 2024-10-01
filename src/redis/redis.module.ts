

import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as IoredisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule,
    IoredisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        return {
            type:"single",
            url: configService.get<string>('REDIS_URL'), 
           
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
