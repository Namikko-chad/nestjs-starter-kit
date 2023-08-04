import { UserRole, } from '../../../users/user.enum';

export interface InvitePayload {
  email: string;
  expiredAt: Date;
  role: UserRole;
}