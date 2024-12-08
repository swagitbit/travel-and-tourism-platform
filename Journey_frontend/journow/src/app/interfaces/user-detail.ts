export interface UserDetail {
  id: string;
  name: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  twoFactorEnabled: true;
  phonNumberConfirmed: true;
  accessFailedCount: 0;
}
