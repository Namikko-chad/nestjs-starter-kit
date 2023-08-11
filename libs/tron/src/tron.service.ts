/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable, } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TronWeb from 'tronweb';

import { AbstractNetwork, } from '@libs/blockchain';

import {
  ITronBlock,
  ITronConfig,
  ITronTransaction,
  ITronTransactionInfo,
  TRON_PROVIDER_CONFIG,
} from './tron.constants';

// const { AbiCoder, } = ethers.utils;
// const ADDRESS_PREFIX = '41';

@Injectable()
export default class TronService extends AbstractNetwork {
  protected readonly options: ITronConfig;

  private _provider: TronWeb;

  constructor(@Inject(TRON_PROVIDER_CONFIG) _options?: ITronConfig) {
    super();

    if (_options) {
      this.options = _options;
      this.connect();
    }
  }

  protected connect(): void {
    const options = {
      fullHost: this.options.provider,
      headers: {
        'TRON-PRO-API-KEY': this.options.apiKey, // TRON GRID support
        'x-api-key': this.options.apiKey, // GetBlock.io support
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this._provider = new TronWeb(options);
  }

  sign(message: string, privateKey: string): string {
    const signature = TronWeb.Trx.signMessageV2(message, privateKey) as string;

    return signature;
  }

  recover(message: string, signature: string): string {
    const address = TronWeb.Trx.verifyMessageV2(message, signature) as string;

    return address;
  }

  public async getCurrentBlock(): Promise<ITronBlock> {
    const tx = await this._provider.trx.getCurrentBlock() as ITronBlock;

    return tx;
  }

  public async getBlock(blockHash: string): Promise<ITronBlock>
  public async getBlock(blockNumber: number): Promise<ITronBlock>
  public async getBlock(_block: number | string): Promise<ITronBlock> {
    const tx = await this._provider.trx.getBlock(_block) as ITronBlock;

    return tx;
  }

  public async getBlockHeight() {
    const blockHeight = await this._provider.trx.getCurrentBlock() as ITronBlock;

    return blockHeight.block_header.raw_data.number;
  }

  public async getTransaction(txId: string): Promise<ITronTransaction> {
    const tx = await this._provider.trx.getTransaction(txId) as ITronTransaction;

    return tx;
  }

  public async getTransactionInfo(txId: string): Promise<ITronTransactionInfo> {
    const tx = await this._provider.trx.getTransactionInfo(txId) as ITronTransactionInfo;

    return tx;
  }

  // public decodeParams(
  //   types: string[],
  //   output: string,
  //   ignoreMethodHash: boolean
  // ): any[] | null {
  //   if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8) {
  //     output = '0x' + output.replace(/^0x/, '').substring(8);
  //   }

  //   const abiCoder = new AbiCoder();

  //   if (output.replace(/^0x/, '').length % 64) {
  //     return null;
  //   }

  //   try {
  //     return abiCoder.decode(types, output).reduce((obj, arg, index) => {
  //       if (types[index] === 'address') {
  //         arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
  //       }

  //       if (typeof arg === 'object' && arg._hex) {
  //         arg = parseInt(arg._hex, 16);
  //       }

  //       obj.push(arg);

  //       return obj;
  //     }, []);
  //   } catch (err) {
  //     return null;
  //   }
  // }

  // public async getUnconfirmedTransactionInfo(
  //   txId: string
  // ): Promise<ITronTransactionInfo> {
  //   const tx = await this._provider.trx.getUnconfirmedTransactionInfo(txId);

  //   return tx;
  // }
}
