// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// import { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Check for existing authentication when app starts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const value = await AsyncStorage.getItem('isAuthenticated');
        setIsAuthenticated(value === 'true');
      } catch (error) {
        console.error('Error reading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);