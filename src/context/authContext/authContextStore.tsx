import React, { createContext, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextValue {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
  idToken: string | null;
  setIdToken: (idToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  setLoggedOut: () => {},
  idToken: null,
  setIdToken: () => {},
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idToken, setIdToken] = useState<string | null>(null);

 

  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOut = () => {
    setIsLoggedIn(false);
    setIdToken(null);
    SecureStore.deleteItemAsync('idToken');
  };

  // const setSecureStoreIdToken = async (token: string | null) => {
  //   try {
  //     if (token) {
  //       await SecureStore.setItemAsync('idToken', token);
  //     } else {
  //       await SecureStore.deleteItemAsync('idToken');
  //     }
  //   } catch (error) {
  //     console.log('Error saving idToken to secure store:', error);
  //   }
  // };

  // const getAuthToken = async () => {
  //   try {
  //     return await SecureStore.getItemAsync('idToken');
  //   } catch (error) {
  //     console.log('Error retrieving authentication token:', error);
  //     return null;
  //   }
  // };

  // const setIdTokenWrapper = (token: string | null) => {
  //   setIdToken(token);
  //   setSecureStoreIdToken(token);
  // };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, setLoggedOut, idToken, setIdToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
