import { useContext } from 'react';

import { compDataStore } from './compDataStore';

const useCompData = (name: string) => {
  if (!name) {
    throw Error('Must provide a name to useCompData(name).');
  }
  const { state, dispatch } = useContext(compDataStore);
  const getCompData = (compName: string): Record<string, any> =>
    state[compName] || {};
  const setData = (payload: Record<string, any>, altName = name) => {
    return dispatch({ type: 'SET_DATA', name: altName, payload });
  };
  const clearStore = () => dispatch({ type: 'CLEAR_STORE' });
  const clearComp = (altName?: string) => {
    if (altName) {
      return dispatch({ type: 'CLEAR_COMP', name: altName });
    }
    return dispatch({ type: 'CLEAR_COMP', name });
  };
  return {
    setData,
    compData: getCompData(name),
    getCompData,
    clearStore,
    clearComp,
  };
};

export default useCompData;
