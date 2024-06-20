export type CookieKeys = 'authToken';

export interface ProfileRequest {
  pending: boolean;
  error: string | null;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  brandName: string;
  branches: any[];
}
