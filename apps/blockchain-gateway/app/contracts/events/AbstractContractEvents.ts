import { AbstractContract, } from '../AbstractContract';

export abstract class AbstractContractEvents extends AbstractContract {

  async update(blokNumber: number): Promise<void> {
    this._contract.listenedBlock = blokNumber;
    await this._contractsRepository.save(this._contract);
  }
}