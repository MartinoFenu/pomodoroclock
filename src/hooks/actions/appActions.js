import * as actionTypes from './actionTypes';

export const updateSettings = pair => {
  return {
    type: actionTypes.UPDATE_SETTINGS,
    pair
  }
}
export const initState = initialState => {
  return {
    type: actionTypes.INIT_STATE,
    initialState
  }
}
