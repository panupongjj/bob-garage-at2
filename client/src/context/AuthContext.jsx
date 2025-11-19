import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/localStorage';
import { authAPI } from '../services/api';

const AuthContext = createContext();

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
  const [token, setTokenState] = useState(getToken());

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = getToken();
      if (storedToken) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.user);
          setTokenState(storedToken);
        } catch (error) {
          // Token invalid, clear it
          removeToken();
          setTokenState(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

