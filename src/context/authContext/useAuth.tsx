import { useContext } from 'react';

import { AuthContext } from './authContextStore';
import { GetUserOutput } from '../../generated/graphql';

interface AuthContextValue {
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
  getUser?: () => GetUserOutput['data'];
}
export function useAuth(): AuthContextValue {
  return useContext(AuthContext) as AuthContextValue;
}
