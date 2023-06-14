import { useContext } from 'react';

import { AuthContext } from './authContextStore';

interface AuthContextValue {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
}
export function useAuth(): AuthContextValue {
  return useContext(AuthContext) as AuthContextValue;
}
