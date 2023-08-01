export enum AuthNativeErrors {
  AlreadyExist = 403100,
  PasswordIncorrect = 403101,
}

export const AuthNativeErrorsMessages = {
  [AuthNativeErrors.AlreadyExist]: 'Email already exist',
  [AuthNativeErrors.PasswordIncorrect]: 'Password incorrect',
};