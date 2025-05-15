import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '@/services/ApiService';
import { StorageService } from '@/services/StorageService';
import { LoggerService } from '@/services/LoggerService';
import { User, LoginCredentials, RegisterData } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          try {
            const response = await ApiService.post<{ token: string; user: User }>('/auth/login', credentials);
            
            const { token, user } = response.data;
            
            // Set token in storage and API service
            StorageService.set('authToken', token);
            ApiService.setAuthToken(token);
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            
            LoggerService.info('User logged in successfully', { userId: user.id });
          } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Login failed';
            LoggerService.error('Login error', error);
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
          }
        },

        register: async (userData: RegisterData) => {
          set({ isLoading: true, error: null });
          try {
            await ApiService.post('/auth/register', userData);
            
            // After successful registration, automatically login
            await get().login({
              email: userData.email,
              password: userData.password,
            });
            
            LoggerService.info('User registered successfully');
          } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Registration failed';
            LoggerService.error('Registration error', error);
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
          }
        },

        logout: () => {
          // Clear token and user data
          StorageService.remove('authToken');
          ApiService.setAuthToken(null);
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
          
          LoggerService.info('User logged out');
        },

        checkAuth: async () => {
          set({ isLoading: true });
          
          // Check if we have a token stored
          const token = StorageService.get<string>('authToken');
          
          if (!token) {
            set({ isLoading: false });
            return;
          }
          
          // Validate token (check if expired)
          try {
            const decoded = jwtDecode<{ exp: number }>(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            
            if (isExpired) {
              get().logout();
              set({ isLoading: false });
              return;
            }
            
            // Token is valid, get user data
            ApiService.setAuthToken(token);
            const response = await ApiService.get<User>('/auth/me');
            
            set({
              user: response.data,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            LoggerService.error('Token validation error', error);
            get().logout();
            set({ isLoading: false });
          }
        },

        resetPassword: async (email: string) => {
          set({ isLoading: true, error: null });
          try {
            await ApiService.post('/auth/reset-password', { email });
            set({ isLoading: false });
            LoggerService.info('Password reset email sent');
          } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Password reset failed';
            LoggerService.error('Password reset error', error);
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
          }
        },

        updateProfile: async (data: Partial<User>) => {
          const { user } = get();
          if (!user) {
            throw new Error('User is not authenticated');
          }
          
          set({ isLoading: true, error: null });
          
          try {
            const response = await ApiService.put<User>(`/users/${user.id}`, data);
            
            set({
              user: response.data,
              isLoading: false,
              error: null,
            });
            
            LoggerService.info('User profile updated successfully');
          } catch (error: any) {
            const errorMessage = error?.response?.data?.message || 'Profile update failed';
            LoggerService.error('Profile update error', error);
            set({ isLoading: false, error: errorMessage });
            throw new Error(errorMessage);
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ token: state.token }),
      }
    )
  )
);