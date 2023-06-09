import React, { createContext, useState } from 'react';

// Create a context to hold the user login state
export const AuthContext = createContext({});

// AuthProvider component to wrap your app and provide the AuthContext value
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, setLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
}
