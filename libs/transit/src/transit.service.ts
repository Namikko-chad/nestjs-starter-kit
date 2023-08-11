import { Injectable, Logger, } from '@nestjs/common';

import { Fetch, } from '@libs/utils';

import { ITransactionDetails, ITransitResponse, } from './transit.constants';

@Injectable()
export class TransitService {
  protected readonly _fetch = new Fetch();
  private readonly _logger = new Logger(TransitService.name);

  // constructor() {
  //   const instance = axios.create({
  //     baseURL: 'https://aggserver.transit.finance',
  //     timeout: 10000,
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   });

  //   this._httpService = instance;
  // }

  private async _call<T>(url: string, query?: Record<string, string | readonly string[]>): Promise<T> {
    return this._fetch.request<T>('GET', `https://aggserver.transit.finance${url}`, query);
  }

  async getTransactionDetails(
    hash: string,
    chainId: number
  ): Promise<ITransitResponse<ITransactionDetails>> {
    try {
      const response = await this._call<ITransitResponse<ITransactionDetails>>('/v3/transit/details', {
        chain: String(chainId),
        hash,
      });

      return response;
    } catch (err) {
      this._logger.error(err);
      throw err;
    }
  }
}
