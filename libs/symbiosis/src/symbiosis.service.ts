import { Inject, Injectable, Logger, } from '@nestjs/common';

import { Fetch, } from '@libs/utils';

import { SymbiosisConfig, } from './symbiosis.config';
import { SymbiosisTransactionInfo, } from './symbiosis.constants';

@Injectable()
export class SymbiosisService {
  @Inject(SymbiosisConfig)
  private readonly _config: SymbiosisConfig;
  protected readonly _fetch = new Fetch();
  private readonly _logger = new Logger(SymbiosisService.name);

  private async _call<T>(url: string, query?: Record<string, string | readonly string[]>): Promise<T> {
    return this._fetch.request<T>('GET', `${this._config.url}${url}`, query);
  }

  async getTransactionInfo(
    chainId: number,
    hash: string
  ): Promise<SymbiosisTransactionInfo> {
    try {
      const response = await this._call<SymbiosisTransactionInfo>(`/v1/tx/${chainId}/${hash}`);

      return response;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  }
}
