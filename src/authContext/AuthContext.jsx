import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();

  const handlelogin = (token) => {
    // Implement your login logic here
    setIsAuthenticated(token);
  };

  const logout = () => {
    // Implement your logout logic here
    setIsAuthenticated(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handlelogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
