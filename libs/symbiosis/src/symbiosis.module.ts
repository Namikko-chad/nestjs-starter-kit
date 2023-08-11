import { Module, } from '@nestjs/common';
import { ConfigModule, ConfigService, } from '@nestjs/config';

import { SymbiosisConfig, } from './symbiosis.config';
import { SymbiosisService, } from './symbiosis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, SymbiosisConfig, SymbiosisService],
  exports: [SymbiosisService],
})
export class SymbiosisModule {}
