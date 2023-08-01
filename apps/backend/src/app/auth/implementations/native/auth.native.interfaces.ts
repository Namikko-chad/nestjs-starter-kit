// TODO move to correct folder
export interface ITOTP {
  secret: string;
  qr: string;
}

export interface IAttemptAuth {
  counter: number;
  lockedTill?: number;
}

export interface AuthNativeSecurity {
  emailConfirmation?: Record<string, unknown>;
  passwordChangeConfirmation?: Record<string, unknown>;
  passwordRestoreConfirmation?: Record<string, unknown>;
  passwordExpiresAt?: number;
  totp?: ITOTP;
  loginAttempt?: IAttemptAuth;
}