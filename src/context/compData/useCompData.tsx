import { useContext } from 'react';

import { compDataStore } from './compDataStore';
import { CompDataStateTree } from '../constants';

const useCompData = <T,>(name: keyof CompDataStateTree) => {
  if (!name) {
    throw Error('Must provide a name to useCompData(name).');
  }
  const { state, dispatch } = useContext(compDataStore);
  // const getCompData = (compName: typeof name): CompDataStateTree[typeof name] =>
  //   state[compName] || {};
  const setData = (payload: Partial<T>) => {
    return dispatch({ type: 'SET_DATA', name, payload });
  };
  const clearStore = () => dispatch({ type: 'CLEAR_STORE', name: '' });
  const clearComp = (altName?: string) => {
    if (altName) {
      return dispatch({ type: 'CLEAR_COMP', name: altName });
    }
    return dispatch({ type: 'CLEAR_COMP', name });
  };
  return {
    setData,
    compData: (state[name] as T) || ({} as T),
    // getCompData,
    clearStore,
    clearComp,
  };
};

export default useCompData;
