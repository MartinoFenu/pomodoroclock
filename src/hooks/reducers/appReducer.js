import * as actionTypes from '../actions/actionTypes';

const initState = ( state, action ) => {
  return {
    ...state,
    ...action.initialState
  }
}

const updateSettings = ( state, action ) => {
  return {
    ...state,
    ...action.pair
  }
}

const appReducer = ( state, action ) => {
  switch (action.type) {
    case actionTypes.INIT_STATE:
      return initState( state, action );
    case actionTypes.UPDATE_SETTINGS:
      return updateSettings( state, action );
    default:
      return state
  }
}

export default appReducer;
