/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tronweb from 'tronweb';

import { AbstractAddressFormatter, } from '../address-formatter.abstract';

export class AddressFormatterTron extends AbstractAddressFormatter {
  private _isTronAddress(address: string) {
    return address.slice(0, 1) === '4' || address.slice(0, 1) === 'T';
  }

  format(address: string): string {
    if (!this._isTronAddress(address)) {
      throw new ReferenceError('Isn\'t Tron address');
    }

    return tronweb.address.fromHex(address) as string;
  }

  unFormat(address: string): string {
    if (!this._isTronAddress(address)) {
      throw new ReferenceError('Isn\'t Tron address');
    }

    return tronweb.address.toHex(address).toLowerCase() as string;
  }
}
