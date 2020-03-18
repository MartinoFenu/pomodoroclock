import * as actionTypes from './actionTypes';

export const incLength = e => {
  return {
    type: actionTypes.inc,
    event: e
  }
}

export const decLength = e => {
  return {
    type: actionTypes.dec,
    event: e
  }
}

export const handleSingleInputChange = ( id, val ) => {
  return {
    type: actionTypes.SINGLE_INPUT_CHANGE,
    id,
    val
  }
}
export const updateCurrTimeLeft = ( op, id, val ) => {
  return {
    type: actionTypes.UPDATE_CURRENT_LENGTH,
    op,
    id,
    val
  }
}
export const updateTimeLeft = timeLeft => {
  return {
    type: actionTypes.UPDATE_TIMELEFT,
    timeLeft
  }
}
export const updateLoopingPom = timeLeft => {
  return {
    type: actionTypes.UPDATE_LOOPING_POM,
    timeLeft
  }
}

export const resetPomodoro = () => {
  return {
    type: actionTypes.RESET_POMODORO
  }
}
export const toggle = ids => {
  return {
    type: actionTypes.TOGGLE,
    ids
  }
}
export const togglePlay = () => {
  return {
    type: actionTypes.TOGGLE_PLAY
  }
}

export const setMultiplePom = () => {
  return {
    type: actionTypes.SET_MULTIPLE_POM
  }
}

export const updateMultiplePom = ( string, lengths ) => {
  return {
    type: actionTypes.UPDATE_MULTIPLE_POM,
    string,
    lengths
  }
}
