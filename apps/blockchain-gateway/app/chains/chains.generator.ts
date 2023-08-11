
import { DeepPartial, } from 'typeorm';

import { ChainType, ContractType, } from '@libs/blockchain';
import { AbstractGenerator, Utils, } from '@libs/utils';

import { Chain, } from './chains.entity';

export interface ContractGeneratorOptions {
  type: ContractType;
  chainId: number;
  dexFee?: number;
  decimal?: number;
  address?: string;
}

export class ChainsGenerator extends AbstractGenerator<Chain> {

  default(): DeepPartial<Chain> {
    return {
      id: Utils.getInt(),
      symbol: Utils.getUUID(),
      decimal: 18,
      confirmationsMin: 0,
      type: ChainType.EVM,
      data: {},
    };
  }
}
