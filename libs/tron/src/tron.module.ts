import { DynamicModule,Module,  } from '@nestjs/common';

import { ITronConfig, TRON_PROVIDER_CONFIG, } from './tron.constants';
import TronService from './tron.service';

@Module({})
export class TronModule {
  static register(options: ITronConfig): DynamicModule {
    return {
      providers: [
        {
          provide: TRON_PROVIDER_CONFIG,
          useValue: options,
        },
        options.name
          ? {
            provide: options.name,
            useClass: TronService,
          }
          : TronService
      ],
      module: TronService,
      exports: [options.name ? options.name : TronService],
    };
  }
}
