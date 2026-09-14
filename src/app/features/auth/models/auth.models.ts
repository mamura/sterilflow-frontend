export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type UserRole = 'STUDENT' | 'OPERATOR';

export interface CurrentUser {
  id: string;
  name: string;
  email: string | null;
  roles: UserRole[];
  registration: string | null;
  accessCode: string | null;
}
