import { Column, Entity, } from 'typeorm';

import { TransactionStatus, TransactionType, } from '@libs/blockchain';
import { AbstractEntity, } from '@libs/utils/database';

export interface ITransactionMeta {
  amountIn: string;
  amountOut: string;
  currencyIn: string;
  currencyOut: string;
  chainInId: number;
  chainOutId: number;
  hashIn: string;
  hashOut: string;
  convertationFee: string;
}

@Entity({
  schema: 'blockchain_gateway'
  })
export class Transaction extends AbstractEntity {

  @Column({
    unique: true,
    type: 'varchar',
    })
    hash: string;

  @Column({
    type: 'integer',
    })
    chainId: number;

  @Column({
    type: 'integer',
    })
    blockNumber: number;

  @Column({
    type: 'varchar',
    })
    from: string;

  @Column({
    type: 'varchar',
    })
    to: string;

  @Column({
    type: 'numeric',
    })
    amount: string;

  @Column({
    type: 'numeric',
    })
    fee: string;

  @Column({
    type: 'varchar',
    })
    contractId: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.CREATED
    })
    status: TransactionStatus;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.TRANSFER,
    })
    type: TransactionType = TransactionType.TRANSFER;

  @Column({
    type: 'jsonb',
    })
    meta: ITransactionMeta;

  @Column({
    type: 'json',
    })
    data: object;

  @Column()
    date: Date;
}
