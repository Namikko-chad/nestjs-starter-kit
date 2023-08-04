export enum AuthInviteErrors {
  InviteExpired = 403130,
}

export const AuthInviteErrorsMessages = {
  [AuthInviteErrors.InviteExpired]: 'Invite expired',
};