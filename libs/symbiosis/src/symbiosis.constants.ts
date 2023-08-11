export enum SymbiosisTransactionStatus {
  SUCCESS = 0,
  NOT_FOUND = -1,
  PENDING = 1,
  STUCKED = 2,
  REVERTED = 3,
}

export interface SymbiosisTransactionInfo {
  status: {
    code: SymbiosisTransactionStatus;
    text: string;
  };
  tx: {
    hash: string;
    chainId: number;
    tokenAmount: {
      symbol: string;
      address: string;
      amount: string;
      chainId: number;
      decimals: number;
    };
    time: string;
    address: string;
  };
  txIn: {
    chainId: number;
    txHash: string;
    tokenAmount: {
      symbol: string;
      address: string;
      amount: string;
      decimals: number;
    };
    time: string;
    address: string;
  }
}
