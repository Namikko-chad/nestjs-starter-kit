import { ConfigService, } from '@nestjs/config';

export function appConfig(configService: ConfigService) {
  return {
    base_url: configService.get<string>('BASE_URL') ?? 'localhost',
    development: configService.get<string>('NODE_ENV') ?? 'development',
    stage: configService.get<string>('NODE_ENV') ?? 'stage',
    production: configService.get<string>('NODE_ENV') ?? 'production',
    test: configService.get<string>('NODE_ENV') ?? 'test',
    env: configService.get<string>('NODE_ENV'),
    debug: configService.get<string>('DEBUG') === 'true',
  };
}