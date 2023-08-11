export abstract class AbstractAddressFormatter {
  abstract format(_address: string): string;

  abstract unFormat(_address: string): string;
}
