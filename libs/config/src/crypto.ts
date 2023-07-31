import { ConfigService, } from '@nestjs/config';

export function cryptoConfig(configService: ConfigService) {
  return {
    cryptoKey: configService.get<string>('CRYPTO_KEY') ?? 'bDHCA+O80kSJFGbz+tRb7H8XSUGULOUhLhthkM57LGE=',
  };
}