import { Injectable, Logger, } from '@nestjs/common';

import { Fetch, } from '@libs/utils';

import { OpenOceanTransaction, } from './openocean.constants';

@Injectable()
export class OpenOceanService {
  protected readonly _fetch = new Fetch();
  private readonly _logger = new Logger(OpenOceanService.name);

  private async _call<T>(url: string, query?: Record<string, string | readonly string[]>): Promise<T> {
    return this._fetch.request<T>('GET', `https://open-api.openocean.finance${url}`, query);
  }

  async getTransaction(
    chain: string,
    hash: string
  ): Promise<OpenOceanTransaction> {
    try {
      const response = await this._call<OpenOceanTransaction>(`/v3/${chain}/getTransaction`, { hash, });

      return response;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  }
}
