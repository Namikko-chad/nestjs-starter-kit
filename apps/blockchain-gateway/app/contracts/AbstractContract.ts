import { Inject, Logger, } from '@nestjs/common';
import Web3 from 'web3';
import { HttpProvider, WebsocketProvider, } from 'web3-core';
import { Contract as Web3Contract, } from 'web3-eth-contract';

import { Contract, } from './contracts.entity';
import { ContractsRepository, } from './contracts.repository';

export abstract class AbstractContract {
  protected readonly _logger = new Logger('Contract');

  @Inject()
  protected readonly _contractsRepository: ContractsRepository;
  protected _contract: Contract;

  protected readonly abstract address: string;
  protected readonly abstract chainId: number;

  protected web3: Web3;
  protected web3Provider: WebsocketProvider | HttpProvider;
  protected web3Contract: Web3Contract;

  async init(): Promise<void> {
    const contract = await this._contractsRepository.findOneBy({
      id: this.address,
      chainId: this.chainId,
    });
    if (!contract)
      throw new Error('Contract not found');
    this._contract = contract;
    this._logger.log(`Loading contract ${contract.symbol}`);
    this.web3Provider =
    contract.chain.data.provider.slice(0, 3) === 'wss'
      ? new Web3.providers.WebsocketProvider(contract.chain.data.provider)
      : new Web3.providers.HttpProvider(contract.chain.data.provider);
    this.web3 = new Web3(this.web3Provider);
    this.web3Contract = new this.web3.eth.Contract(contract.abi, contract.address);
  }
}
