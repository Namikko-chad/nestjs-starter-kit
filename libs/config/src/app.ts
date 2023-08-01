import { Injectable, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';

interface AppConfigInterface {
  readonly base_url: string;
  readonly development: boolean;
  readonly stage: boolean;
  readonly production: boolean;
  readonly test: boolean;
  readonly env: string;
  readonly debug: boolean;
}

@Injectable()
export class AppConfig implements AppConfigInterface {
  public readonly base_url: string;
  public readonly development: boolean;
  public readonly stage: boolean;
  public readonly production: boolean;
  public readonly test: boolean;
  public readonly env: string;
  public readonly debug: boolean;

  constructor(private readonly configService: ConfigService) {
    this.base_url = this.configService.get<string>('BASE_URL') ?? 'localhost';
    this.development = this.configService.get<string>('NODE_ENV') === 'development';
    this.stage = this.configService.get<string>('NODE_ENV') === 'stage';
    this.production = this.configService.get<string>('NODE_ENV') === 'production';
    this.test = this.configService.get<string>('NODE_ENV') === 'test';
    this.env = this.configService.get<string>('NODE_ENV') ?? 'development';
    this.debug = this.configService.get<string>('DEBUG') === 'true';
  }
}