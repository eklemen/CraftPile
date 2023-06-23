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
  emailContext: string | null;
  setEmailContext: any;

}


export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  setLoggedOut: () => { },
  emailContext: null,
  setEmailContext: () => {}
});


export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [emailContext, setEmailContext] = useState<string>("");



  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOut = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync('idToken');
  };





  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, setLoggedOut, emailContext, setEmailContext}}
    >
      {children}
    </AuthContext.Provider>
  );
}