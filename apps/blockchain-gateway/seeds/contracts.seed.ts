
import { ConfigService, } from '@nestjs/config';
import { DataSource, } from 'typeorm';

import { AddressFormatter, ContractType, } from '@libs/blockchain';
import { AbstractSeed, } from '@libs/tools/seeds/seed.abstract';

import { Contract, } from '../app/contracts/contracts.entity';

interface IContractsSeed {
  symbol: string;
  address: string;
  decimal: number;
  chain_id: number;
  type: ContractType;
  dex_fee: number;
}

export default class ContractsSeed extends AbstractSeed {

  constructor(protected configService: ConfigService) {
    super(configService);
  }

  public async run(ds: DataSource): Promise<void> {
    const seeds = this.loadSeeds<IContractsSeed>(this.configService.getOrThrow<string>('CONTRACTS_DB_FILE'));
    seeds.forEach((seed) => (seed.address = AddressFormatter.format(seed.address)));
    await Promise.all(
      seeds.map(async (seed) => {
        const res = await ds
          .getRepository(Contract)
          .createQueryBuilder('contracts')
          .where(`"contracts"."address" = '${seed.address}' AND "contracts"."chain_id" = ${seed.chain_id}`)
          .getOne();

        if (!res) {
          return ds.createQueryBuilder().insert().into(Contract).values([seed]).execute();
        } else {
          return Promise.resolve();
        }
      })
    );
  }
}
