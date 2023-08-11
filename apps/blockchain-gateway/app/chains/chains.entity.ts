import { ConfigService, } from '@nestjs/config';
import { AfterLoad, Column, Entity, PrimaryColumn, } from 'typeorm';

import { ChainType, } from '@libs/blockchain';
import { CryptoConfig, } from '@libs/config/crypto';
import { CryptoUtils, } from '@libs/utils/crypto.utils';

export interface IChainDataEVM {
  provider: string;
}

export interface IChainDataTron {
  provider: string;
  apiKey: string;
}

type ChainData = IChainDataEVM | IChainDataTron;

const cryptoConfig = new CryptoConfig(new ConfigService());
const cryptoUtils = new CryptoUtils({ key: cryptoConfig.cryptoKey, });

@Entity({
  schema: 'blockchain_gateway'
  })
export class Chain {
  @PrimaryColumn()
    id: number;

  @Column({
    type: 'varchar',
    })
    symbol: string;

  @Column({
    type: 'smallint',
    })
    decimal: number;

  @Column({
    type: 'numeric',
    })
    confirmationsMin: number;

  @Column({
    type: 'enum',
    enum: ChainType
    })
    type: ChainType;

  @Column({
    type: 'jsonb',
    })
    data: ChainData;
  
  @AfterLoad()
  private dataDecode(): void {
    for (const key in this.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-argument
      this.data[key] = cryptoUtils.decrypt(this.data[key]);
    }
  }
}
