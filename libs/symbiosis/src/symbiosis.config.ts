import { Injectable, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

export interface SymbiosisConfigInterface {
  url: string;
}

@Injectable()
export class SymbiosisConfig implements SymbiosisConfigInterface {
  public url: string;

  constructor(private readonly configService: ConfigService) {
    this.url = this.configService.getOrThrow<string>('SYMBIOSIS_URL');
  }
}
