import { Injectable, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

interface CryptoConfigInterface {
  readonly cryptoKey: string;
}

@Injectable()
export class CryptoConfig implements CryptoConfigInterface {
  public readonly cryptoKey: string;

  constructor(private readonly configService: ConfigService) {
    this.cryptoKey = this.configService.get<string>('CRYPTO_KEY') ?? 'bDHCA+O80kSJFGbz+tRb7H8XSUGULOUhLhthkM57LGE=';
  }
}