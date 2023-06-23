import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState } from 'react';

import { useGetUserQuery } from '../../generated/graphql';

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
  setLoggedOut: () => {},
  emailContext: null,
  setEmailContext: () => {},
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { reset } = useNavigation<any>();
  const { data: userData } = useGetUserQuery();
  const [emailContext, setEmailContext] = useState<string>('');

  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  const setLoggedOut = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync('idToken');
  };

  // const getUser = () => {
  //   if (userData?.getUser?.data) {
  //     return userData.getUser.data!;
  //   } else {
  //     reset({
  //       index: 0,
  //       routes: [
  //         {
  //           name: 'AuthStack',
  //         },
  //       ],
  //     });
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        setLoggedOut,
        emailContext,
        setEmailContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
