import { UserStatus, } from './users.enum';

export interface UserSettings {
  oldStatus?: UserStatus;
  subscriptionNews?: boolean;
  language?: string;
  hidePersonalDataInReview?: boolean;
  timezone?: string;
  subscribeToNewsletter?: boolean;
  isRegistered?: boolean;
  is2FASaved?: boolean;
}