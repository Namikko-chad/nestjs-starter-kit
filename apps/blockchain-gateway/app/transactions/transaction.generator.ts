import { DataSource, DeepPartial, Repository, } from 'typeorm';

import { TransactionStatus, } from '@libs/blockchain';
import { AbstractGenerator, Utils, } from '@libs/utils';

import { Chain, } from '../chains/chains.entity';
import { ITransactionMeta, Transaction, } from './transaction.entity';

export interface TransactionGeneratorOptions {
  hash?: string;
  chainId?: number;
  blockNumber?: number;
  from?: string;
  to?: string;
  amount?: string;
  fee?: string;
  contractId?: string;
  status?: TransactionStatus;
  meta?: ITransactionMeta;
}

export default class TransactionGenerator extends AbstractGenerator<Transaction> {
  private readonly _transactionRepository: Repository<Transaction>;
  private readonly _chainRepository: Repository<Chain>;

  constructor(protected ds: DataSource) {
    super(ds);
    this._transactionRepository = ds.getRepository(Transaction);
    this._chainRepository = ds.getRepository(Chain);
  }

  default(): DeepPartial<Transaction> {
    return {
      hash: Utils.getUUID(),
      blockNumber: 100,
      from: Utils.getUUID(),
      to: Utils.getUUID(),
      amount: '100',
      fee: '100',
      status: TransactionStatus.FINISHED,
    };
  }

  override async create(params?: DeepPartial<Transaction> | undefined): Promise<Transaction> {
    if (!params?.chainId) {
      const chain = await this._chainRepository.findOne({}) as Chain;
      params!.chainId = chain.id;
    }

    return super.create(params);
  }
}
