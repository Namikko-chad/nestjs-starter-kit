import { Inject, Injectable, } from '@nestjs/common';
import Web3 from 'web3';
import { BlockTransactionString, Transaction, TransactionReceipt, } from 'web3-eth';
import { AbiItem, } from 'web3-utils';

import { AbstractNetwork, } from '@libs/blockchain';

import { ISignResponse, IWeb3Config, WEB3_PROVIDER_CONFIG, } from './web3.constants';

export interface IParameterType {
  type: string;
  name: string;
}

export interface IParameter extends IParameterType {
  components?: IParameterType[];
}

@Injectable()
export class Web3Service extends AbstractNetwork {
  protected readonly options: IWeb3Config;

  private _provider = new Web3();

  constructor(@Inject(WEB3_PROVIDER_CONFIG) _options?: IWeb3Config) {
    super();

    if (_options) {
      this.options = _options;
      this.connect();
    }
  }

  protected connect(): void {
    this._provider = new Web3(new Web3.providers.HttpProvider(this.options.provider));
  }

  sign(message: string, privateKey: string): ISignResponse {
    const response = this._provider.eth.accounts.sign(message, privateKey);

    return response;
  }

  recover(message: string, signature: string): string {
    const address = this._provider.eth.accounts.recover(message, signature);

    return address.toLowerCase();
  }

  public async getCurrentBlock(): Promise<BlockTransactionString> {
    const block = await this._provider.eth.getBlock('latest');

    return block;
  }

  public async getBlock(blockHash: string): Promise<BlockTransactionString>
  public async getBlock(blockNumber: number): Promise<BlockTransactionString>
  public async getBlock(_block: number | string): Promise<BlockTransactionString> {
    const block = await this._provider.eth.getBlock(_block);

    return block;
  }

  public async getBlockHeight() {
    const blockHeight = await this._provider.eth.getBlockNumber();

    return blockHeight;
  }

  public async getTransaction(hash: string): Promise<Transaction> {
    const data = await this._provider.eth.getTransaction(hash);

    return data;
  }

  public async getTransactionReceipt(
    txId: string
  ): Promise<TransactionReceipt> {
    const data = await this._provider.eth.getTransactionReceipt(txId);

    return data;
  }

  public decodeLogs(
    parameters: IParameter[],
    hex: string,
    topics: string[]
  ): unknown {
    try {
      const output = this._provider.eth.abi.decodeLog(parameters, hex, topics);

      return output;
    } catch (err) {
      return null;
    }
  }

  public decodeParameters(parameters: IParameter[], data: string): unknown {
    try {
      const output = this._provider.eth.abi.decodeParameters(
        parameters,
        `0x0${data.slice(11, data.length)}`
      );

      return output;
    } catch (err) {
      return null;
    }
  }

  public decodeParameter(parameters: IParameter, data: string): unknown {
    try {
      const output = this._provider.eth.abi.decodeParameter(parameters, data);

      return output;
    } catch (err) {
      return null;
    }
  }

  public encodeFunctionCall(abiItem: AbiItem, params: string[]): unknown {
    try {
      const output = this._provider.eth.abi.encodeFunctionCall(abiItem, params);

      return output;
    } catch (err) {
      return null;
    }
  }

  public async call(to: string, data: string) {
    try {
      const output = await this._provider.eth.call({
        to,
        data,
      });

      return output;
    } catch (err) {
      return null;
    }
  }

  public async getGasPrice(): Promise<string> {
    return this._provider.eth.getGasPrice();
  }
}
