import { UserRole, } from '../../../users/users.enum';

export interface InvitePayload {
  email: string;
  expiredAt: Date;
  role: UserRole;
}