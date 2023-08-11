import { describe, expect, it,  } from '@jest/globals';

import { AddressFormatter, } from './address-formatter';

describe('Symbiosis module', () => {

  it('should format address', () => {
    const address = AddressFormatter.format('0x130abdE72B32069A7d926252f8472D9a427A70b8');
    expect(address).toBe('0x130abde72b32069a7d926252f8472d9a427a70b8');
  });
    
  it('should return unformatted address', () => {
    const address = AddressFormatter.unFormat('0x130abdE7252f8472D9a427A70b8');
    expect(address).toBe('0x130abdE7252f8472D9a427A70b8');
  });
});