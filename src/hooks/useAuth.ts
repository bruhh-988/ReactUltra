import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

/**
 * Custom hook to access the authentication context
 * @returns Authentication context values and methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};