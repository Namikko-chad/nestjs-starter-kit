export enum UsersErrors {
  UserNotFound = 404102,
  UserNotACtive = 403103,
}

export const UsersErrorsMessages = {
  [UsersErrors.UserNotFound]: 'User not found',
  [UsersErrors.UserNotACtive]: 'User not active',
};