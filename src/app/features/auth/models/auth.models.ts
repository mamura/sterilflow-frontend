export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type UserRole = 'CLIENT' | 'OPERATOR';

export type ClientCategory = string | null;

export interface CurrentUser {
  id: string;
  name: string;
  institutionalCode: string;
  email: string;
  roles: UserRole[];
  clientCategory: ClientCategory;
}
