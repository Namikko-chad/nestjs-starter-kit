
import { DeepPartial, } from 'typeorm';

import { ContractType, } from '@libs/blockchain';
import { AbstractGenerator, Utils, } from '@libs/utils';

import { Contract, } from './contracts.entity';

export interface ContractGeneratorOptions {
  type: ContractType;
  chainId: number;
  symbol?: string;
  address?: string;
  decimal?: number;
  dexFee?: number;
}

export class ContractsGenerator extends AbstractGenerator<Contract> {

  default(): DeepPartial<Contract> {
    return {
      symbol: Utils.getUUID(),
      address: Utils.getUUID().toLowerCase(),
      decimal: 18,
      dexFee: 0,
    };
  }

  override create(params: ContractGeneratorOptions): Promise<Contract> {
    return super.create(params);
  }
}
