import { DynamicModule, Module, } from '@nestjs/common';

import { IWeb3Config, WEB3_PROVIDER_CONFIG, } from './web3.constants';
import { Web3Service, } from './web3.service';

@Module({})
export class Web3Module {
  static register(options: IWeb3Config): DynamicModule {
    return {
      module: Web3Module,
      providers: [
        {
          provide: WEB3_PROVIDER_CONFIG,
          useValue: options,
        },
        options.name
          ? {
            provide: options.name,
            useClass: Web3Service,
          }
          : Web3Service
      ],
      exports: [options.name ? options.name : Web3Service],
    };
  }
}
