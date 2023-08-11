import { Test, } from '@nestjs/testing';

import { beforeEach,describe, expect, it,  } from '@jest/globals';

import { TransitModule, } from './transit.module';
import { TransitService, } from './transit.service';

describe('Symbiosis module', () => {
  let transit: TransitService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TransitModule],
    }).compile();

    transit = moduleRef.get<TransitService>(TransitService);
  });

  describe('work with api', () => {
    it('should receive tx info by txIn', async () => {
      const expectedResponse = {
        data: {
          chain: 'ETH',
          fromChain: 'ETH',
          fromChainTitle: 'Ethereum',
          toChain: 'BSC',
          toChainTitle: 'Binance Smart Chain',
          timestamp: 1675762931,
          channel: 'android',
          amountIn: '550000000000000000',
          amountOut: '2708287000000000000',
          amountOutMin: '1',
          fromAddress: '0xa2d28F1C3D5FaaEC956CB6728097d58AdE5a2B46',
          fromDecimals: 18,
          fromSymbol: 'ETH',
          fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          sourceExplorer: 'https://etherscan.io/tx/0xbb34f035fa5b3f74b424468f77ee075684c5fe28f49ec68e5a28c6954e929031',
          sourceHash: '0xbb34f035fa5b3f74b424468f77ee075684c5fe28f49ec68e5a28c6954e929031',
          toAddress: '0xa2d28F1C3D5FaaEC956CB6728097d58AdE5a2B46',
          toDecimals: 18,
          toSymbol: 'BNB',
          toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          targetExplorer: 'https://bscscan.com/tx/0x551bf2098ab391952fb8da6287ce2376ea60d44c251b4650d053e341ae0cd73c',
          targetHash: '0x551bf2098ab391952fb8da6287ce2376ea60d44c251b4650d053e341ae0cd73c',
          status: 'Success',
          statusNotes: 'receive_complete',
          dexs: [
            {
              dex: 'METAPATH',
              icon: 'https://tp-statics.tokenpocket.pro/logo/dapp/metapath.png',
            }
          ],
        },
        message: 'Success',
        result: 0,
      };
      const res = await transit.getTransactionDetails('0xbb34f035fa5b3f74b424468f77ee075684c5fe28f49ec68e5a28c6954e929031', 1);
      expect(res).toEqual(expectedResponse);
    });
  });

});