export enum AuthErrors {
  TokenNotFound = 404101,
}

export const AuthErrorsMessages = {
  [AuthErrors.TokenNotFound]: 'Token not found',
};