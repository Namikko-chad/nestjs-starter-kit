
import { ConfigService, } from '@nestjs/config';
import { DataSource, } from 'typeorm';

import { ChainType, } from '@libs/blockchain';
import { CryptoConfig, } from '@libs/config/crypto';
import { AbstractSeed, } from '@libs/tools';
import { CryptoUtils, } from '@libs/utils';

import { Chain, IChainDataEVM, IChainDataTron, } from '../app/chains/chains.entity';

interface IChainsSeed {
  id: number;
  symbol: string;
  name: string;
  type: ChainType;
  decimal: number;
  confirmations_min: number;
}

export default class ChainsSeed extends AbstractSeed {

  constructor(protected configService: ConfigService) {
    super(configService);
  }

  public async run(ds: DataSource): Promise<void> {
    const cryptoConfig = new CryptoConfig(this.configService);
    const crypto = new CryptoUtils({ key: cryptoConfig.cryptoKey, });
    const providers = JSON.parse(this.configService.getOrThrow<string>('CHAINS_PROVIDER')) as { [key: number]: string };
    const apiKeys = JSON.parse(this.configService.getOrThrow<string>('CHAINS_API_KEYS')) as { [key: number]: string };
    const seeds = this.loadSeeds<IChainsSeed>(`chains.${this.appConfig.env}.csv`);

    await Promise.all(
      seeds.map(async (seed) => {
        const repository = ds.getRepository(Chain);

        const chain = await repository.findOneBy({
          id: seed.id,
        });

        let data: IChainDataEVM | IChainDataTron = <IChainDataEVM>{};

        if (seed.type === ChainType.EVM) {
          const provider = crypto.encrypt(providers[seed.id] as string);

          data = <IChainDataEVM>{
            provider,
          };
        } else if (seed.type === ChainType.TRON) {
          const provider = crypto.encrypt(providers[seed.id] as string);
          const apiKey = crypto.encrypt(apiKeys[seed.id] as string);

          data = <IChainDataTron>{
            provider,
            apiKey,
          };
        }

        if (!chain) {
          return ds
            .createQueryBuilder()
            .insert()
            .into(Chain)
            .values([
              {
                ...seed,
                data,
              }
            ])
            .execute();
        } else {
          return ds.createQueryBuilder().update(Chain).set({ data, }).where('id = :id', { id: seed.id, }).execute();
        }
      })
    );
  }
}
