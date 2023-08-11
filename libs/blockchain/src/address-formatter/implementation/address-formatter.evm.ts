import { AbstractAddressFormatter, } from '../address-formatter.abstract';

export class AddressFormatterEvm extends AbstractAddressFormatter {

  private _isEvmAddress(address: string) {
    return address.slice(0, 2) === '0x' && address.length === 42;
  }

  format(address: string): string {
    if (!this._isEvmAddress(address)) {
      throw new ReferenceError('Isn\'t EVM address');
    }

    return address.toLowerCase();
  }

  unFormat(address: string): string {
    if (!this._isEvmAddress(address)) {
      throw new ReferenceError('Isn\'t EVM address');
    }

    return address.toLowerCase();
  }
}
