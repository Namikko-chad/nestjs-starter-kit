import { ConfigService, } from '@nestjs/config';

export function redisConfig(configService: ConfigService) {
  return {
    host: configService.get<string>('REDIS_HOST') ?? 'localhost',
    port: configService.get<number>('REDIS_PORT') ?? 6379,
    username: configService.get<string>('REDIS_USERNAME') ?? undefined,
    password: configService.get<string>('REDIS_PASSWORD') ?? undefined,
    db: configService.get<number>('REDIS_DATABASE') ?? undefined,
    url: configService.get<string>('REDIS_LINK') ?? 'redis://localhost', 
  };
}
