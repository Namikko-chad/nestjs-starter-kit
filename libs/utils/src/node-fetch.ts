
import { Injectable, Logger, } from '@nestjs/common';
import FormData from 'form-data';
import fetch, { BodyInit, HeadersInit, } from 'node-fetch';
import { URL, } from 'url';

import { Exception, } from './Exception';

@Injectable()
export class Fetch {
  private readonly _logger = new Logger('Node-Fetch');

  private apiURL(route: string): URL {
    return new URL(route);
  }

  async request<Res>(
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    query?: Record<string, string | readonly string[]>,
    payload?: FormData | object | string,
    headers?: HeadersInit
  ): Promise<Res> {
    try {
      this._logger.log(`${method}, ${endpoint}`);
      const url = this.apiURL(endpoint);
      new URLSearchParams(query).forEach((value,name) => {
        url.searchParams.append(name,value);
      });
      let body: string | FormData | BodyInit;

      if (payload instanceof FormData || typeof payload === 'string') {
        body = payload;
      } else {
        body = JSON.stringify(payload);
      }

      const req = {
        method,
        headers: {
          ...headers,
          'Accept': 'application/json',
          'Connection': 'close',
        },
        body,
      };

      if (payload instanceof FormData) {
        Object.assign(req.headers, { 'Content-Type': 'multipart/form-data', });
      } else if (typeof payload === 'string') {
        Object.assign(req.headers, { 'Content-Type': 'text/plain', });
      } else {
        Object.assign(req.headers, { 'Content-Type': 'application/json', });
      }

      const response = await fetch(url, req);
      const contentType = response.headers.get('Content-Type');

      if (!contentType)
        throw ReferenceError('Content-Type not set');

      if (!response.ok) {
        this._logger.error(`Failed to request. Status: ${response.status} ${response.statusText}`);
        throw new Exception(response.status, 'Failed send request', response as unknown as Readonly<Record<string, unknown>>);
      }

      if (contentType.includes('application/json'))
        return response.json() as Res;

      return response.buffer() as Res;
    } catch (error) {
      if (error instanceof Exception) {
        this._logger.error(error.message, error.data);
      } else {
        const err = error as Error;
        this._logger.error(err.message);
      }

      throw error;
    }
  }
}