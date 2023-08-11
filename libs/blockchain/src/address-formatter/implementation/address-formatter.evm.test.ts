import { describe, expect, it,  } from '@jest/globals';

import { AddressFormatterEvm, } from './address-formatter.evm';


describe('AddressFormatter EVM', () => {
  const foratter = new AddressFormatterEvm();
  
  it('should format address', () => {
    const address = foratter.format('0x130abdE72B32069A7d926252f8472D9a427A70b8');
    expect(address).toBe('0x130abde72b32069a7d926252f8472d9a427a70b8');
  });

  it('should unFormat address', () => {
    const address = foratter.unFormat('0x130abdE72B32069A7d926252f8472D9a427A70b8');
    expect(address).toBe('0x130abde72b32069a7d926252f8472d9a427a70b8');
  });
});