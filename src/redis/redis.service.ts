
import { Injectable } from '@nestjs/common';
import { InjectRedis} from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {} 

  async set(key: string, value: any, expiration: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', expiration);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
