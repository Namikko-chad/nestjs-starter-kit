import { AbstractAddressFormatter, } from './address-formatter.abstract';
import { AddressFormatterEvm, } from './implementation/address-formatter.evm';
import { AddressFormatterTron, } from './implementation/address-formatter.tron';

export class AddressFormatter {
  private static readonly _implementations: AbstractAddressFormatter[] =
    [];

  static register(impl: AbstractAddressFormatter): void {
    AddressFormatter._implementations.push(impl);
  }

  static format(address: string): string {
    for (const impl of this._implementations) {
      try {
        return impl.format(address);
      } catch (error) {
        continue;
      }
    }

    return address;
  }

  static unFormat(address: string): string {
    for (const impl of this._implementations) {
      try {
        return impl.unFormat(address);
      } catch (error) {
        continue;
      }
    }

    return address;
  }
}

AddressFormatter.register(new AddressFormatterEvm());
AddressFormatter.register(new AddressFormatterTron());
