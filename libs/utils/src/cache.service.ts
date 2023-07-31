import { CACHE_MANAGER,Inject, Injectable,  } from '@nestjs/common';
import { Cache, Store, } from 'cache-manager';
import { RedisClientType, } from 'redis';

interface RedisCache extends Cache {
  store: RedisStore;
}

interface RedisStore extends Store {
  name: 'redis';
  getClient: () => RedisClientType;
  isCacheableValue: (value: any) => boolean;
}

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: RedisCache) {}

  public async set(key: string, value: any, seconds?: number): Promise<any> {
    value = JSON.stringify(value);

    if (!seconds) {
      await this.cache.set(key, value);
    } else {
      await this.cache.set(key, value, { ttl: seconds, });
    }
  }

  public async get(key: string): Promise<unknown> {
    const data = await this.cache.get(key);

    if (typeof data === 'string') {
      return JSON.parse(data) as unknown;
    } else {
      return null;
    }
  }

  public async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  public async flushAll(): Promise<void> {
    await this.cache.reset();
  }

  async close(): Promise<void>  {
    const client = this.cache.store.getClient();
    await client.quit();
  }
}
