import { Injectable, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

interface RabbitConfigInterface {
  readonly utl: string;
}

@Injectable()
export class RabbitConfig implements RabbitConfigInterface {
  public readonly utl: string;

  constructor(private readonly configService: ConfigService) {
    this.utl = this.configService.getOrThrow<string>('RABBIT_URL');
  }
}