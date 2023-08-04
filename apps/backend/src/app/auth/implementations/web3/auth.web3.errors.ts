export enum AuthWeb3Errors {
  SignatureBroken = 403120,
  AlreadyExist = 403121
}

export const AuthWeb3ErrorsMessages = {
  [AuthWeb3Errors.SignatureBroken]: 'Signature broken',
  [AuthWeb3Errors.AlreadyExist]: 'Already exist',
};