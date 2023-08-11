import { AbstractNetworkOptions, } from '@libs/blockchain/AbstractNetwork';

export const TRON_PROVIDER_CONFIG = 'TRON_PROVIDER_CONFIG';

export interface ITronConfig extends AbstractNetworkOptions {
  apiKey: string;
  name: string;
}

export enum TronRetValues {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface ITronBlock {
  blockID: string;
  block_header: {
    raw_data: {
      number: number;
      txTrieRoot: string;
      witness_address: string;
      parentHash: string;
      version: number;
      timestamp: number;
    };
    witness_signature: string;
  };
  transactions: ITronTransaction[];
}

export interface ITronTransaction {
  ret: {
    contractRet: TronRetValues;
  }[];
  signature: string[];
  txID: string;
  raw_data: {
    contract: {
      parameter: {
        value: {
          owner_address: string;
          to_address?: string;
          amount?: string;
          contract_address?: string;
          data?: string;
        };
        type_url: string;
      };
      type: 'TransferContract' | 'TriggerSmartContract';
    }[];
    ref_block_bytes: string;
    ref_block_hash: string;
    expiration: number;
    fee_limit: number;
    timestamp: number;
  };
  raw_data_hex: string;
}

export interface ITronTransactionInfo {
  id: string;
  fee: number;
  blockNumber: number;
  blockTimeStamp: number;
  contractResult: string[];
  contract_address?: string;
  receipt: {
    origin_energy_usage?: number;
    energy_usage_total?: number;
    net_fee: number;
    result?: TronRetValues;
  };
  log?: ITronTransactionLog[];
  internal_transactions?: {
    hash: string;
    caller_address: string;
    transferTo_address: string;
    callValueInfo: unknown[];
    note: string;
  }[];
}

export interface ITronTransactionLog {
  address: string;
  topics: unknown[];
  data: string;
}
