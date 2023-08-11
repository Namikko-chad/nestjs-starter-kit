import { describe, expect, it,  } from '@jest/globals';

import { AddressFormatterTron, } from './address-formatter.tron';


describe('AddressFormatter Tron', () => {
  const foratter = new AddressFormatterTron();
  
  it('should format address', () => {
    const address = foratter.format('417730bb8c3fdba3dbb3c98d4fcd75b2804493cefc');
    expect(address).toBe('TLqRntSwbCkLSDvt9qBrBidZQQrgrZKtiA');
  });

  it('should unFormat address', () => {
    const address = foratter.unFormat('TLqRntSwbCkLSDvt9qBrBidZQQrgrZKtiA');
    expect(address).toBe('417730bb8c3fdba3dbb3c98d4fcd75b2804493cefc');
  });
});