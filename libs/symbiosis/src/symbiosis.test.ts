import { Test, } from '@nestjs/testing';

import { beforeEach,describe, expect, it,  } from '@jest/globals';

import { SymbiosisTransactionStatus, } from './symbiosis.constants';
import { SymbiosisModule, } from './symbiosis.module';
import { SymbiosisService, } from './symbiosis.service';

describe('Symbiosis module', () => {
  let symbiosis: SymbiosisService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SymbiosisModule],
    }).compile();

    symbiosis = moduleRef.get<SymbiosisService>(SymbiosisService);
  });

  describe('work with api', () => {
    it('should receive tx info by txIn', async () => {
      const expectedResponse = {
        status: {
          code: 0,
          text: 'Success',
        },
        tx: {
          hash: '0x12cf2fb01e6d2f1aab07d2b6121d38cd0bca2080e5b4de7cc1fbea2f0298ddf8',
          chainId: 1,
          tokenAmount: {
            symbol: 'ETH',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
            address: '',
            amount: '7696781823059789',
            chainId: 1,
            decimals: 18,
          },
          time: '2023-06-28T09:06:35Z',
          address: '0x36332eb394fbe6cd624960ddc376a92c5c2c1204',
        },
        txIn: {
          chainId: 56,
          txHash: '0xd9192aa43dd8c15b95f8be2f16c78e540c5d114fe6cc6f2395a970b7381adff0',
          tokenAmount: {
            symbol: 'BNB',
            address: '0x0000000000000000000000000000000000000000',
            amount: '117773246676012064',
            decimals: 18,
          },
          time: '2023-06-28T09:04:59Z',
          address: '0xf2de6bc355684847a1d6e66358cd59caab88ed9a',
        },
      };
      const res = await symbiosis.getTransactionInfo(56, '0xd9192aa43dd8c15b95f8be2f16c78e540c5d114fe6cc6f2395a970b7381adff0');
      expect(res).toEqual(expectedResponse);
    });

    it('shouldn\'t receive tx info by txOut', async () => {
      const res = await symbiosis.getTransactionInfo(1, '0x12cf2fb01e6d2f1aab07d2b6121d38cd0bca2080e5b4de7cc1fbea2f0298ddf8');
      expect(res.status.code).toEqual(SymbiosisTransactionStatus.NOT_FOUND);
    });
  });

});