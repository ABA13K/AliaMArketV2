"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/api';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => false,
  logout: async () => {},
  clearError: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data, error } = await authService.getCurrentUser();
        console.log('User load response:', { data, error }); // Debug log
        
        if (error) {
          console.error('Error loading user:', error);
          throw new Error(error);
        }
        
        if (data?.user) {
          console.log('Setting user:', data.user); // Debug log
          setUser(data.user);
        } else {
          console.warn('No user data received');
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        setUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("HII")
    setLoading(true);
    setError(null);
    try {
      const { data, error: apiError } = await authService.login(email, password);
      if (apiError) throw new Error(apiError);
      
      if (data?.token) {
        localStorage.setItem('authToken', data.token);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      localStorage.removeItem('authToken');
      setUser(null);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      login, 
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);