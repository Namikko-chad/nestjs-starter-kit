import { Logger, } from '@nestjs/common';
import * as crypto from 'crypto';
import hmacSha256 from 'crypto-js/hmac-sha256';
import sha256 from 'crypto-js/sha256';

interface IGetJsonPayloadResponse {
  iv: string;
  value: string;
  mac: string;
}

export interface ICryptoOptions {
  key?: string;
  sha?: string;
  algorithm?: string;
}

const DEFAULT_SETTINGS = {
  algorithm: 'aes-256-cbc',
  sha: 'sha256',
  key: 'bDHCA+O80kSJFGbz+tRb7H8XSUGULOUhLhthkM57LGE=',
};

export class CryptoUtils {
  private algorithm: string;
  private sha: string;
  private key: Buffer;

  private _logger = new Logger('Crypto-Utils');

  constructor(options: ICryptoOptions = {}) {
	  this.algorithm = options.algorithm ?? DEFAULT_SETTINGS.algorithm;
	  this.sha = options.sha ?? DEFAULT_SETTINGS.sha;
	  this.key = Buffer.from(options.key ?? DEFAULT_SETTINGS.key, 'base64');
  }

  private _hashDeserialize(str: string): string {
	  return str
		  .substring(str.indexOf('"') + 1, str.lastIndexOf(';'))
		  .replace(/"/g, '');
  }

  private _getJsonPayload(payload: string): IGetJsonPayloadResponse {
	  try {
		  return JSON.parse(Buffer.from(payload, 'base64').toString()) as IGetJsonPayloadResponse;
	  } catch (e) {
      this._logger.error('Payload cannot be parsed');
		  throw e;
	  }
  }

  private _hashSerialize(str: string): string {
	  return `s:${str.length}:"${str};"`;
  }

  private _hashHmac(data: string, key: Buffer): string {
	  const hmac = crypto.createHmac(this.sha, key);
	  hmac.update(data);

	  return hmac.digest('hex');
  }

  private _hash(iv: string, value: string): string {
	  const data = iv + value;

	  return this._hashHmac(data, this.key);
  }

  /**
   * Encrypt data with crypto library
   * @param value data
   * @returns encrypted data
   */

  public encrypt(value: string | number): string {
	  const _iv = crypto.randomBytes(16);
	  const serializedValue = this._hashSerialize(<string>value);

	  const base64_iv = _iv.toString('base64');

	  const cipher = crypto.createCipheriv(this.algorithm, this.key, _iv);

	  let encrypted = cipher.update(serializedValue, 'utf8', 'base64');
	  encrypted += cipher.final('base64');

	  const _mac = this._hash(base64_iv, encrypted);

	  const payloadObject = {
		  iv: base64_iv,
		  value: encrypted,
		  mac: _mac,
	  };
	  
    const base64_payload = Buffer.from(JSON.stringify(payloadObject)).toString(
      'base64'
    );
		
    return base64_payload;
  }

  /**
   * Decrypt hash with crypto library
   * @param payload hash
   * @returns decrypted data
   */

  public decrypt(payload: string): string {
	  const _payload = this._getJsonPayload(payload);
	  const _iv = Buffer.from(_payload['iv'], 'base64');

	  const decipher = crypto.createDecipheriv(this.algorithm, this.key, _iv);

	  let decrypter = decipher.update(_payload['value'], 'base64', 'utf8');
	  decrypter += decipher.final('utf8');

	  return this._hashDeserialize(decrypter);
  }

  /**
   * Get hash for message with crypto-js/sha256 library
   * @param message
   * @returns hash
   */

  static sha256(message: string, toString = false): string | object {
	  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
	  const hash = <object>sha256(message);

    if (toString) {
      return String(hash);
    }

    return hash;
  }

  /**
   * Recovery hash for message by public key with crypto-js/hmac-sha256 library
   * @param message
   * @returns hash
   */

  static hmacSha256(message: string, key: string) {
	  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
	  const hash = String(hmacSha256(message, key));
		
    return hash;
  }
}
