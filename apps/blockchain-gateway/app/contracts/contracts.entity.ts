import { Column, Entity, JoinColumn, ManyToOne, } from 'typeorm';
import { AbiItem, } from 'web3-utils';

import { ContractType, } from '@libs/blockchain';
import { AbstractEntity, } from '@libs/utils/database';

import { Chain, } from '../chains';

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
    type: 'integer',
    default: 0
    })
    listenedBlock: number;

  @Column({
    type: 'enum',
    enum: ContractType
    })
    type: ContractType;

  @Column({
    type: 'jsonb',
    })
    abi: AbiItem[];

  @ManyToOne(() => Chain, (chain) => chain.id)
  @JoinColumn({ name: 'chainId', referencedColumnName: 'id' })
    chain: Chain;
}
