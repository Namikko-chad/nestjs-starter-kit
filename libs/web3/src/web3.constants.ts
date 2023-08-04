export const WEB3_PROVIDER_CONFIG = 'WEB3_PROVIDER_CONFIG';

export interface IWeb3Config {
  chain?: string;
  chainId?: number;
  provider?: string;
  name?: string;
}

export const NATIVE_CURRENCY_ADDRESS = '0x';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NULL_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export interface ITransaction {
  hash: string;
  nonce: number;
  blockHash: string | null;
  blockNumber: number | null;
  transactionIndex: number | null;
  from: string;
  to: string | null;
  value: string;
  gasPrice: string;
  gas: number;
  input: string;
}

export interface IBlock {
  number: number;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  stateRoot: string;
  miner: string;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  timestamp: number | string;
  size: number;
  difficulty: number;
  totalDifficulty: number;
  uncles: string[];
  transactions: ITransaction[];
}

export interface IGetPastEventsOptions {
  filter?: {
    [key: string]: number | string | string[] | number[];
  };
  fromBlock: number;
  toBlock: number;
}

export interface ISignResponse {
  message: string;
  messageHash?: string;
  v: string;
  r: string;
  s: string;
  signature: string;
}
