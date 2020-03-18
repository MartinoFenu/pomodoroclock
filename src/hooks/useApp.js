import { useEffect, useReducer, useState, useCallback } from 'react';
import appReducer from './reducers/appReducer';
import * as actions from './actions/index';
import { useLocalStorage } from './hooks';

const initialState = {
  lang: 'it',
  theme: 'light',
  audio: 'water',
  showOnTitle: true,
  showCookieBanner: true
}

const useApp = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const [storageVal, setStorageVal] = useLocalStorage('tomatoPref', initialState);
  const [defValues, setDefValues] = useState(initialState);

  useEffect( () => {
    setDefValues(storageVal);
    dispatch(actions.initState(storageVal))
  }, [storageVal]);

  const handleSettings = useCallback(e => {
    dispatch(actions.updateSettings({
      [e.currentTarget.name]: e.currentTarget.value
    }))
  }, [])

  const handleCheckbox = useCallback( e => {
    dispatch(actions.updateSettings({
      [e.currentTarget.name]: e.currentTarget.checked
    }))
  }, [])

  const handleCookieBanner = useCallback(e => {
    dispatch(actions.updateSettings({
      [e.currentTarget.name]: !state.showCookieBanner
    }))
  }, [state.showCookieBanner])

  useEffect(() => {
    setStorageVal(state)
  }, [state, setStorageVal])

  return {
    ...state,
    handleSettings,
    handleCheckbox,
    defValues,
    handleCookieBanner
  }
}

export default useApp;
