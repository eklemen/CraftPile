import React, { createContext, useReducer } from 'react';
import { CompDataStateTree, PILE } from '../constants';

type ContextAction = {
  type: string;
  name: string;
  payload?: Record<string, any>;
};

const initialState: Partial<CompDataStateTree> = {};
const compDataStore = createContext<{
  state: Partial<CompDataStateTree>;
  dispatch: React.Dispatch<ContextAction>;
}>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = compDataStore;

const compDataInitializer = (initialState: Partial<CompDataStateTree>) => {
  return {
    ...initialState,
  };
};

const CompDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state: Partial<CompDataStateTree>, action: ContextAction) => {
      switch (action.type) {
        case 'SET_DATA':
          return {
            ...state,
            [action.name]: {
              ...state[action.name as keyof CompDataStateTree],
              ...action.payload,
            },
          };
        case 'CLEAR_COMP':
          return {
            ...state,
            [action.name]: { ...action.payload },
          };
        case 'CLEAR_STORE':
          return initialState;
        default:
          throw new Error('Something went wrong in the compDataStore.');
      }
    },
    initialState
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { compDataStore, CompDataProvider };
