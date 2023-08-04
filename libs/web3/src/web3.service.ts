import { Inject, Injectable, } from '@nestjs/common';
import Web3 from 'web3';
import { BlockTransactionString, Transaction, TransactionReceipt, } from 'web3-eth';
import { AbiItem, Mixed, } from 'web3-utils';

import { ISignResponse, IWeb3Config, } from './web3.constants';

export interface IParameterType {
  type: string;
  name: string;
}

export interface IParameter extends IParameterType {
  components?: IParameterType[];
}

@Injectable()
export class Web3Service {
  private readonly _options: IWeb3Config;

  private _provider: Web3;

  constructor(@Inject('WEB3_PROVIDER_CONFIG') options: IWeb3Config) {
    this._options = options;
    this._connect();
  }

  private _connect(): void {
    const provider = this._options.provider
      ? new Web3.providers.HttpProvider(this._options.provider)
      : null;
    this._provider = new Web3(provider);
  }

  get chainId() {
    return this._options.chainId;
  }

  get provider() {
    return this._options.provider;
  }

  sign(data: string | Mixed[], privateKey: string): ISignResponse {
    const message = Array.isArray(data)
      ? this._provider.utils.soliditySha3(...data) as string
      : data;
    const response = this._provider.eth.accounts.sign(message, privateKey);

    return response;
  }

  recover(data: string | Mixed[], signature: string) {
    const message = Array.isArray(data)
      ? this._provider.utils.soliditySha3(...data) as string
      : data;

    const address = this._provider.eth.accounts.recover(message, signature);

    return address.toLowerCase();
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

  public async getTransaction(txId: string): Promise<Transaction> {
    const data = await this._provider.eth.getTransaction(txId);

    return data;
  }

  public async getTransactionReceipt(
    txId: string
  ): Promise<TransactionReceipt> {
    const data = await this._provider.eth.getTransactionReceipt(txId);

    return data;
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

  public async getGasPrice(): Promise<string> {
    return this._provider.eth.getGasPrice();
  }
}
