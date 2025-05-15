import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: string;
  createdAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for existing auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      try {
        // Simple token validation (in a real app, would verify with backend)
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Mock user data - in real app, this would be from the token or API
          setUser({
            id: '123',
            email: 'user@example.com',
            username: 'demouser',
            firstName: 'Demo',
            lastName: 'User',
            role: 'admin',
            createdAt: new Date().toISOString()
          });
          setIsAuthenticated(true);
        } else {
          // Token expired
          localStorage.removeItem('auth_token');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (credentials.email === 'demo@example.com' && credentials.password === 'demo1234') {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJlbWFpbCI6ImRlbW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiRGVtbyBVc2VyIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2NzYyMzkwMjJ9.8h-M1i8H0fc_FJJe7_3Y_xwsA-JTzQLIkCOEk0J7gRw';
        localStorage.setItem('auth_token', mockToken);
        
        setUser({
          id: '123',
          email: credentials.email,
          username: 'demouser',
          firstName: 'Demo',
          lastName: 'User',
          role: 'admin',
          createdAt: new Date().toISOString()
        });
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError('Invalid email or password');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiTmV3IFVzZXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTY3NjIzOTAyMn0.8h-M1i8H0fc_FJJe7_3Y_xwsA-JTzQLIkCOEk0J7gRw';
      localStorage.setItem('auth_token', mockToken);
      
      setUser({
        id: '456',
        email: data.email,
        username: data.username,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        role: 'user',
        createdAt: new Date().toISOString()
      });
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success (nothing happens in demo)
      console.log(`Password reset requested for: ${email}`);
    } catch (err) {
      setError('Password reset failed. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      if (user) {
        setUser({
          ...user,
          ...data
        });
      }
    } catch (err) {
      setError('Profile update failed. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};