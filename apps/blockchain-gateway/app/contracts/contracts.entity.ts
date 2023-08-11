import { Column, Entity, } from 'typeorm';

import { ContractType, } from '@libs/blockchain';
import { AbstractEntity, } from '@libs/utils/database';

@Entity({
  schema: 'blockchain_gateway'
  })
export class Contract extends AbstractEntity {

  @Column({
    type: 'varchar',
    })
    symbol: string;

  @Column({
    type: 'integer',
    })
    chainId: number;

  @Column({
    type: 'varchar',
    })
    address: string;

  @Column({
    type: 'smallint',
    })
    decimal: number;

  @Column({
    type: 'numeric',
    default: 0,
    })
    dexFee: number;

  @Column({
    type: 'enum',
    enum: ContractType
    })
    type: ContractType;
}
