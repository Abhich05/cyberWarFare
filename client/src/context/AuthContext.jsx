import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

// Token storage helpers
const TOKEN_KEY = 'authToken';

const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.verify();
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      // User is not authenticated
      setUser(null);
      setIsAuthenticated(false);
      removeToken(); // Clear invalid token
    } finally {
      setLoading(false);
    }
  };

  const signup = useCallback(async (name, email, password) => {
    try {
      const response = await authAPI.signup({ name, email, password });
      if (response.success) {
        // Save token for Authorization header fallback
        if (response.token) {
          saveToken(response.token);
        }
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Account created successfully!');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Signup failed');
      return { success: false, error: error.message };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.success) {
        // Save token for Authorization header fallback
        if (response.token) {
          saveToken(response.token);
        }
        setUser(response.user);
        setIsAuthenticated(true);
        toast.success('Welcome back!');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Ignore logout API errors
    } finally {
      // Always clear local state
      setUser(null);
      setIsAuthenticated(false);
      removeToken();
      toast.success('Logged out successfully');
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    signup,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
