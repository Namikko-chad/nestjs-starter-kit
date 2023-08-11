export enum OpenOceanTransactionStatus {
  FAIL = 0,
  SUCCESS = 1,
  NOT_FOUND = -2,
  PENDING = -1,
}

export interface OpenOceanTransaction {
  code: number;
  data?: {
    id: number;
    tx_id: null;
    block_number: string;
    tx_index: string;
    address: string;
    tx_hash: string;
    tx_hash_url: string;
    sender: string;
    receiver: string;
    in_token_address: string;
    in_token_symbol: string;
    out_token_address: string;
    out_token_symbol: string;
    referrer: string;
    in_amount: string;
    out_amount: string;
    fee: string;
    referrer_fee: string;
    usd_valuation: number;
    create_at: Date;
    update_at: Date;
    tx_fee: string;
    tx_fee_valuation: string;
    in_token_decimals: number;
    out_token_decimals: number;
    in_amount_value: string;
    out_amount_value: string;
    tx_profit: string;
    tx_profit_valuation: string;
    status: OpenOceanTransactionStatus;
  };
}
