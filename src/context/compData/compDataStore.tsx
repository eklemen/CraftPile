import React, { createContext, useReducer } from 'react';

const initialState = {};
const compDataStore = createContext(initialState);
const { Provider } = compDataStore;

const compDataInitializer = (initialState: Record<string, any>) => {
  return {
    ...initialState,
  };
};

const CompDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
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
