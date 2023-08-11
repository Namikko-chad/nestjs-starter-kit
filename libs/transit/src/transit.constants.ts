export interface ITransitResponse<T> {
  result: number;
  message: string;
  data: T;
}

export enum TransitTransactionStatus {
  SUCCESS = 'Success',
  FAILURE = 'Failure',
  RECEIVING = 'Receiving',
}

export interface ITransactionDetails {
  sourceHash: string;
  targetHash: string;
  chain: string;
  status: TransitTransactionStatus;
  statusNotes: string;
  fromToken: string;
  toToken: string;
  amountIn: string;
  amountOut: string;
  amountOutMin: string;
  fromDecimals: number;
  toDecimals: number;
  fromAddress: string;
  toAddress: string;
  fromChain: string;
  toChain: string;
  timestamp: number;
  channel: string;
  dexs: {
    dex: string;
    icon: string;
  }[];
}
