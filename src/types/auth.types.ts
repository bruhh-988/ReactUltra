// src/types/auth.types.ts
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export type Permission =
  | 'CREATE_CONTENT'
  | 'EDIT_CONTENT'
  | 'DELETE_CONTENT'
  | 'MANAGE_USERS'
  | 'VIEW_ANALYTICS'
  | 'VIEW_CONTENT';

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  notifications?: boolean;
  emailNotifications?: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  preferences: UserPreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  email: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}