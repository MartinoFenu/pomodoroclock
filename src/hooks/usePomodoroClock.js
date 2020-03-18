import { useReducer, useEffect, useRef, useCallback } from 'react';
import { pomodoroReducer } from './reducers/pomodoroClock';
import * as actions from './actions/index';
import { useInterval, usePomInput } from './hooks';
import useNotificationAPI from './useNotificationAPI';
import {notifications} from '../template/notifications';

export const usePomodoroClock = callback => {
  //passing a ref to handleBlur the handleBlur function doesn't change at every render
  const initialStateRef = useRef({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500000, //milliseconds
      isRunning: false,
      isStopped: true,
      isBreakTime: false,
      isSingle: true,
      isLooping: true,
      multipleLengths: [25, 5, 25, 5, 30, 15],
      multiplePom: '25+5+25+5+30+15',
      multiplePomIndex: 0,
      intervalId: ''
  })
  const initialState = initialStateRef.current;
  const audioRef = useRef();
  const [state, dispatch ] = useReducer(pomodoroReducer, initialState)

  const [formVal, lengths, multiInputChange, multiInputBlur] = usePomInput(state.multiplePom, state.multipleLengths);

  const fireNotification = useNotificationAPI();

  //set form for multiplePom
  useEffect(() => {
    dispatch(actions.updateMultiplePom(formVal, lengths))
  }, [formVal, lengths])

  const checkLengthType = useCallback(id => {
    return ( state.isBreakTime &&
      id === 'breakLength' ) || (
      !state.isBreakTime &&
      id === 'sessionLength' )
  }, [state.isBreakTime])

  const handleClickChange = useCallback(e => {
    const id = e.currentTarget.name;
    if(state.isRunning) return;
    else {
      if( checkLengthType(id) )
        dispatch(actions.updateCurrTimeLeft( e.currentTarget.value, id ))
      else dispatch({
        type: e.currentTarget.value,
        id
      })
    }
  }, [state.isRunning, checkLengthType])

  const handleControls = useCallback(e => {
    if(e.currentTarget.value === 'reset') {
      dispatch(actions.resetPomodoro())
    } else if(e.currentTarget.value === 'loop')
      dispatch(actions.toggle(['isLooping']));
    else if(state.isRunning)
      dispatch(actions.togglePlay())
    else
      dispatch(actions.togglePlay())
  }, [state.isRunning]);

  const checkTimeLeft = () => {
    const timeLeft = state.timeLeft - 1000;

    if(timeLeft === 60000 ){
      fireNotification(state.isBreakTime ? notifications.soonBreak : notifications.soonSession);
      dispatch(actions.updateTimeLeft(timeLeft));
    }
    else if( timeLeft < 0 ) {
      audioRef.current.play();
      if(
        (!state.isLooping && (
          ( state.isBreakTime && state.isSingle ) ||
          state.multiplePomIndex + 1 >= state.multipleLengths.length ) )
      ) {
        fireNotification(notifications.end);
        dispatch(actions.resetPomodoro());
      } else {

        const newPomIndex =
          state.multiplePomIndex + 1 >= state.multipleLengths.length ? 0 :
          state.multiplePomIndex + 1;

        const timeLeft = (
          state.isSingle ?
          state.isBreakTime ?
          state.sessionLength : state.breakLength : state.multipleLengths[newPomIndex] ) * 60 *1000;

        fireNotification(state.isBreakTime ? notifications.endBreakLoop : notifications.endSessionLoop);
        dispatch(actions.updateLoopingPom( timeLeft ));
      }
    } else {
      dispatch(actions.updateTimeLeft(timeLeft));
    }
  }

  useInterval(() => {
    checkTimeLeft();
  }, state.isRunning ? 100 : null);

  //elapsed time for circle percentage in ClockFace
  const calcElapsedTime = useCallback(() => {
    return state.isStopped ? 0 : state.timeLeft / ((state.isBreakTime ? state.breakLength : state.sessionLength) * 60 * 1000)
  }, [state.isBreakTime, state.isStopped, state.timeLeft, state.breakLength, state.sessionLength])

  const handlePomType = e => {
    //return if clicks the button for the actual pomodoro type, so don't dispatch an action for nothing
    if(state.isRunning || (e.currentTarget.value === 'Single' && state.isSingle) || (e.currentTarget.value === 'Multiple' && !state.isSingle)) return;
    else if(e.currentTarget.value === 'Single')
      dispatch(actions.toggle(['isSingle']))
    else {
      dispatch(actions.setMultiplePom())
    }
  }

  const handleChange = useCallback(e => {
    if(state.isSingle) {
      const id = e.currentTarget.name;
      const val = parseInt(e.currentTarget.value);

      if(checkLengthType(id))
        dispatch(actions.updateCurrTimeLeft('change', id, val))
      else
        dispatch(actions.handleSingleInputChange(id, val))
    } else {
      const val = e.currentTarget.value
      .match(/[\d+]+/g) ?
                  e.currentTarget.value
                  .match(/[\d+]+/g)
                  .join('') : '';
      multiInputChange(val);
    }
  }, [state.isSingle, multiInputChange, checkLengthType]);

  const handleBlur = useCallback(e => {
    if(state.isSingle) {
      if(e.currentTarget.value === '')  {
        const id = e.currentTarget.name;
        if(checkLengthType(id))
          dispatch(actions.updateCurrTimeLeft(
            'change', id, initialState[id]
          ))
        else dispatch(actions.handleSingleInputChange(initialState[id], id));
      }
      else return;
    } else {
      if(e.currentTarget.value === '' )
        multiInputBlur(initialState.multiplePom);
      else multiInputBlur(e.currentTarget.value);
    }
  }, [state.isSingle, checkLengthType, initialState, multiInputBlur]);

  return {
    ...state,
    audioRef,
    handleClickChange,
    handleControls,
    calcElapsedTime,
    handlePomType,
    handleChange,
    handleBlur
  }
}
