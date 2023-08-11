import { Test, } from '@nestjs/testing';

import { beforeEach,describe, expect, it,  } from '@jest/globals';

import { OpenOceanModule, } from './openocean.module';
import { OpenOceanService, } from './openocean.service';

describe('OpenOcean module', () => {
  let openOcean: OpenOceanService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OpenOceanModule],
    }).compile();

    openOcean = moduleRef.get<OpenOceanService>(OpenOceanService);
  });

  describe('work with api', () => {
    it('should receive tx info by hash', async () => {
      const expectedResponse = {
        code: 200,
        data: {
          id: 519663,
          tx_id: null,
          block_number: 27677917,
          tx_index: 19,
          address: '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
          tx_hash: '0x4e32ab6e0e9ff2db6157a14b0d4bac018f1633e14b3cccbd56541f24f191a5b4',
          tx_hash_url: 'https://bscscan.com/tx/0x4e32ab6e0e9ff2db6157a14b0d4bac018f1633e14b3cccbd56541f24f191a5b4',
          sender: '0x95173d9cE653b82D7d9a7730770cEE591df6aF9e',
          receiver: null,
          in_token_address: '0x8263CD1601FE73C066bf49cc09841f35348e3be0',
          in_token_symbol: 'ALU',
          out_token_address: '0xa865197A84E780957422237B5D152772654341F3',
          out_token_symbol: 'OLE',
          referrer: '0x40603469C577B1Db3D401155901A276F604436f4',
          in_amount: '1547000000000000000000',
          out_amount: '2670227435715666426041',
          fee: '',
          referrer_fee: '',
          usd_valuation: 59.2142096,
          create_at: '2023-04-26T06:09:15.000Z',
          update_at: '2023-04-26T06:09:15.000Z',
          tx_fee: '0.002047275',
          tx_fee_valuation: '0.69359630',
          in_token_decimals: 18,
          out_token_decimals: 18,
          in_amount_value: '1547',
          out_amount_value: '2670.227435715666426041',
          tx_profit: '0',
          tx_profit_valuation: '0',
          status: 1,
        },
      };
      const res = await openOcean.getTransaction('bsc', '0x4e32ab6e0e9ff2db6157a14b0d4bac018f1633e14b3cccbd56541f24f191a5b4');
      expect(res).toEqual(expectedResponse);
    });
  });

});