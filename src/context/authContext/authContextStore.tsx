// import React, { createContext, useState } from 'react';

// // Create a context to hold the user login state
// export const AuthContext = createContext({});

// // AuthProvider component to wrap your app and provide the AuthContext value
// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const setLoggedIn = () => {
//     setIsLoggedIn(true);
//   };

//   const setLoggedOut = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, setLoggedOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import React, { createContext, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextValue {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  setLoggedOut: () => {},
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 

  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOut = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync('idToken');
  };

 



  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, setLoggedOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}