import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { savedItemsAPI } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { isAuthenticated, user, token } = useAuth();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved items when user is authenticated
  useEffect(() => {
    if (isAuthenticated() && user) {
      fetchSavedItems();
    } else {
      setSavedItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  const fetchSavedItems = async () => {
    if (!isAuthenticated() || !user) return;
    
    setLoading(true);
    try {
      const items = await savedItemsAPI.getAll();
      setSavedItems(items);
    } catch (error) {
      console.error('Failed to fetch saved items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSavedItem = async (serviceId) => {
    try {
      const newItem = await savedItemsAPI.add(serviceId);
      setSavedItems((prev) => [...prev, newItem]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeSavedItem = async (id) => {
    try {
      await savedItemsAPI.remove(id);
      setSavedItems((prev) => prev.filter((item) => item.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const isServiceSaved = (serviceId) => {
    return savedItems.some((item) => item.serviceId === serviceId);
  };

  const getSavedItemId = (serviceId) => {
    const item = savedItems.find((item) => item.serviceId === serviceId);
    return item?.id;
  };

  const value = {
    savedItems,
    loading,
    fetchSavedItems,
    addSavedItem,
    removeSavedItem,
    isServiceSaved,
    getSavedItemId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

