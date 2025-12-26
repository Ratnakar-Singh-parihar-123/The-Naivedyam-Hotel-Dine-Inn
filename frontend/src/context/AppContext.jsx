// AppContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Create axios instance with base URL
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Add request interceptor to handle errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Clear user data on unauthorized
        setUser(null);
        setAdmin(false);
        setCartCount(0);
      }
      return Promise.reject(error);
    }
  );

  const isAuth = async () => {
    try {
      const { data } = await axiosInstance.get('/api/auth/is-auth');
      if (data.success) {
        setUser(data.user);
        setAdmin(data.user?.role === 'admin');
      }
    } catch (error) {
      // Silently handle auth errors - user is not logged in
      console.log('Auth check failed:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCartData = async () => {
    try {
      const { data } = await axiosInstance.get('/api/cart/get');
      if (data.success) {
        setCartCount(data.cart?.items?.length || 0);
      }
    } catch (error) {
      // Silently handle cart errors
      console.log('Cart fetch failed:', error.message);
    }
  };

  useEffect(() => {
    isAuth();
    fetchCartData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        admin,
        setAdmin,
        cartCount,
        setCartCount,
        axios: axiosInstance,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;