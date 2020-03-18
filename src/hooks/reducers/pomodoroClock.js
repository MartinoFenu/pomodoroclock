import * as actionTypes from '../actions/actionTypes';

const incLength = ( state, action ) => {
  return {
    ...state,
    [action.id]: state[action.id] + 1
  };
}

const decLength = ( state, action ) => {
  const newLength = state[action.id] > 1 ? state[action.id] -1 : 1
  return {
    ...state,
    [action.id]: newLength
  };
}
const changeInputValue = ( state, action ) => {
  return {
    ...state,
    [action.id]: action.val
  };
}

const updateCurrTimeLeft = ( state, action ) => {
  const updatedState = action.op === 'inc' ?
   incLength( state, action ) :
   action.op === 'change' ? changeInputValue( state, action  ) : decLength( state, action );

  return updateTimeLeft(
    updatedState,
    {
      timeLeft: updatedState[action.id] * 60 *1000
    }
  )
}

const updateTimeLeft = ( state, action ) => {
  return {
    ...state,
    timeLeft: action.timeLeft
  };
}
const updateLoopingPom = ( state, action ) => {
  return {
    ...state,
    isBreakTime: !state.isBreakTime,
    timeLeft: action.timeLeft
  }
}
const resetPomodoro = ( state, action ) => {
  return {
    ...state,
    isStopped: true,
    isRunning: false,
    isBreakTime: false,
    multiplePomIndex: 0,
    timeLeft: state.sessionLength * 60 * 1000
  }
}

const toggle = ( state, action ) => {
  //immutable state
  const updatedState= {...state};
  //toggle every single value in state from the name in the array
  action.ids.forEach( el => {
    updatedState[el] = !updatedState[el]
  })
  return {
    ...state,
    ...updatedState
  }
}

const togglePlay = ( state, action ) => {
  const updatedState = toggle( state, { ids: ['isRunning']});
  return {
    ...state,
    ...updatedState,
    isStopped: false
  }
}
//when clicking the "multuple" button it starts from the last index of the multiple Pomodoro settings
const setMultiplePom = ( state, action ) => {
  const i = state.multiplePomIndex;
  return {
    ...state,
    isSingle: false,
    sessionLength: state.multipleLengths[i],
    breakLength: state.multipleLengths[i + 1],
    timeLeft: ( state.isBreakTime ? state.multipleLengths[i + 1] : state.multipleLengths[i] ) * 60 * 1000
  }
}

const updateMultiplePom= ( state, action ) => {
  return {
    ...state,
    multiplePom: action.string,
    multipleLengths: action.lengths,
    multiplePomIndex: 0,
    sessionLength: action.lengths[0],
    breakLength: action.lengths[1],
    timeLeft: ( state.isBreakTime ? action.lengths[1] : action.lengths[0] ) * 60 * 1000
  }
}

export const pomodoroReducer = ( state, action ) => {
  switch (action.type) {
    case 'inc':
      return incLength( state, action );
    case 'dec':
      return decLength( state, action );
    case actionTypes.SINGLE_INPUT_CHANGE:
     return changeInputValue( state, action )
    case actionTypes.UPDATE_TIMELEFT:
      return updateTimeLeft( state, action );
    case actionTypes.UPDATE_CURRENT_LENGTH:
      return updateCurrTimeLeft( state, action);
    case actionTypes.UPDATE_LOOPING_POM:
      return updateLoopingPom( state, action);
    case actionTypes.RESET_POMODORO:
      return resetPomodoro( state, action );
    case actionTypes.TOGGLE:
      return toggle( state, action );
    case actionTypes.TOGGLE_PLAY:
      return togglePlay( state, action );
    case actionTypes.SET_MULTIPLE_POM: return setMultiplePom( state, action );
    case actionTypes.UPDATE_MULTIPLE_POM: return updateMultiplePom( state, action )
    default:
      return state
  }
}
