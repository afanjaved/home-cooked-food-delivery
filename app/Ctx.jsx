import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component that wraps the application and provides auth state
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    user: null,
  });

  // Function to handle login
  const login = (user, token) => {
    setAuthState({
      token,
      isAuthenticated: true,
      user,
    });
  };

  // Function to handle logout
  const logout = () => {
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  };

  // Provide auth state and functions to children components
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
