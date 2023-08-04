import { Injectable, } from '@nestjs/common';

import { CryptoUtils, } from './crypto.utils';

@Injectable()
export class InviteTokenService {
  private readonly crypto;

  constructor() {
    this.crypto = new CryptoUtils();
  }

  public create<InvitePayload>(data: InvitePayload): string {
    const bufferBase64 = Buffer.from(JSON.stringify(data)).toString('base64');
    const invite = this.crypto.encrypt(bufferBase64);

    return invite;
  }

  public getPayload<InvitePayload>(invite: string): InvitePayload {
    const bufferBase64 = this.crypto.decrypt(invite);
    const payload = JSON.parse(Buffer.from(bufferBase64, 'base64').toString()) as InvitePayload;

    return payload;
  }
}