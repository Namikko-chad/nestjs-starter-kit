
export interface AbstractNetworkOptions {
  chainId: number;
  provider: string;
}

export abstract class AbstractNetwork {

  protected abstract options: AbstractNetworkOptions;

  get chainId(): number {
    if (!this.options.chainId)
      throw new ReferenceError('Chain not set');

    return this.options.chainId;
  }

  get provider(): string {
    if (!this.options.provider)
      throw new ReferenceError('Provider not set');

    return this.options.provider;
  } 

  protected abstract connect(): void

  abstract sign(message: string, privateKey: string): unknown;

  abstract recover(message: string, signature: string): string;

  abstract getCurrentBlock(): Promise<unknown>;

  abstract getBlock(hash: string): Promise<unknown>;
  abstract getBlock(id: number): Promise<unknown>;

  abstract getBlockHeight(): Promise<number>;

  abstract getTransaction(hash: string): Promise<unknown>
}