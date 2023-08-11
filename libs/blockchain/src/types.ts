export enum ChainType {
  EVM = 'e',
  TRON = 't',
}

export const NATIVE_CURRENCY_ADDRESS = '0x';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NULL_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export enum TransactionStatus {
  CREATED = 'c',
  PENDING = 'p',
  FINISHED = 'f',
  REJECTED = 'r',
  NOTFOUND = 'n'
}

export enum TransactionType {
  TRANSFER = 't',
  ON_CHAIN_SWAP = 'o',
  CROSS_CHAIN_SWAP = 'c',
}

export enum TransactionError {
  PARSE_ERROR = 'p',
  WRONG_AMOUNT = 'a',
  WRONG_CURRENCY = 'c',
  WRONG_DATE = 'd',
  WRONG_RECEIVER = 'r',
  WRONG_SENDER = 's',
}

export enum ContractType {
  UNISWAP = 's',
  TOKEN = 't',
  TRANSIT = 'tr',
  SYMBIOSIS = 'sb',
  OPEN_OCEAN = 'oo',
}