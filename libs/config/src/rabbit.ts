import { ConfigService, } from '@nestjs/config';

export function rabbitConfig(configService: ConfigService) {
  return {
    utl: configService.getOrThrow<string>('RABBIT_URL'),
  };
}
