
import { ConfigService, } from '@nestjs/config';
import { DataSource, } from 'typeorm';

import { AddressFormatter, ContractType, } from '@libs/blockchain';
import { AbstractSeed, } from '@libs/tools';

import { Contract, } from '../app/contracts/contracts.entity';

interface ITokensSeed {
  name: string;
  address: string;
  decimal: number;
  symbol: string;
  chain_id: number;
  coinmarketcap_id: number;
  coingecko_id: string;
  market_cap: number;
}

export default class TokensSeed extends AbstractSeed {

  constructor(protected configService: ConfigService) {
    super(configService);
  }

  public async run(ds: DataSource): Promise<void> {
    const seeds = this.loadSeeds<ITokensSeed>(this.configService.getOrThrow<string>('TOKENS_DB_FILE'));
    seeds.forEach((seed) => (seed.address = AddressFormatter.format(seed.address)));
    await Promise.all(
      seeds.map(async (seed) => {
        const res = await ds
          .getRepository(Contract)
          .createQueryBuilder('contracts')
          .where(`"contracts"."address" = '${seed.address}' AND "contracts"."chain_id" = ${seed.chain_id}`)
          .getOne();

        if (!res) {
          return ds
            .createQueryBuilder()
            .insert()
            .into(Contract)
            .values([
              {
                symbol: seed.symbol,
                address: seed.address,
                decimal: seed.decimal,
                chainId: seed.chain_id,
                type: ContractType.TOKEN,
              }
            ])
            .execute();
        } else {
          return Promise.resolve();
        }
      })
    );
  }
}
