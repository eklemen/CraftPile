import React, { createContext, useReducer } from 'react';
import { CompDataStateTree } from '../constants';
import * as domains from '../constants';

const initialState: Partial<CompDataStateTree> = {
  [domains.AUTH]: {},
};
const compDataStore = createContext(initialState);
const { Provider } = compDataStore;

const compDataInitializer = (initialState: Record<string, any>) => {
  return {
    ...initialState,
  };
};

interface Action {
  name: string;
  type: string;
  payload: Record<string, any>;
}

const CompDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state, action: Action) => {
      switch (action.type) {
        case 'SET_DATA':
          return {
            ...state,
            [action.name]: {
              ...state[action.name],
              ...action.payload,
            },
          };
        case 'CLEAR_COMP':
          return {
            ...state,
            [action.name]: {},
          };
        case 'CLEAR_STORE':
          return {};
        default:
          throw new Error('Something went wrong in the compDataStore.');
      }
    },
    initialState,
    compDataInitializer
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { compDataStore, CompDataProvider };
