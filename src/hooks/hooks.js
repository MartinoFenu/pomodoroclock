import { useState, useEffect, useCallback, useRef } from 'react';

const defaultVal = {
  break: 5,
  session: 25
}

//from Dan Abramov post
//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = ( callback, delay ) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

//general purpose toggle function
export const useToggle = defVal => {
  const [toggleValue, setToggleValue] = useState(defVal);
  const toggler = useCallback(() => {
    setToggleValue(!toggleValue)
  }, [toggleValue] );

  return [toggleValue, toggler];
}

export const useFormatTime = time => {
  const [ formattedTime, setFormattedTime ] = useState(0);

  const formatTime = useCallback(() => {
    //from milliseconds to MM:SS
    const minutes = Math.floor( time / ( 1000 * 60 ) );
    //dividing the time in milliseconds for the equivalent of a minute everithings left are seconds
    const seconds = Math.floor( ( time % ( 1000 * 60 ) ) / 1000 );

    return `${minutes < 10 ? `0${minutes}` : minutes }:${seconds < 10 ? `0${seconds}` : seconds }`;
  }, [time])

  useEffect(() => {
    setFormattedTime(formatTime)
  }, [formatTime])


  return formattedTime;
}
//special onBlur and onChange functions for timers inputs in the pomodoroClock

export const usePomInput = (multiplePom, multipleLengths) => {
  const [formVal, setFormVal] = useState(multiplePom);
  const [lengths, setLengths] = useState(multipleLengths);

  //initilize variables for others functions
  const initVar = useCallback((val) => {
    const strLength = val.length;
    const lastVal = val[ strLength - 1 ];

    const lengths = val.split('+').filter(el => el !== '').map(el => parseInt(el) < 1 ? 1 : parseInt(el));
    return [strLength, lastVal, lengths]
  }, [])

  const multiInputChange = useCallback((val) => {
    const [, lastVal, lengths] = initVar(val);

    const joinedString = lengths.join('+');
    const newString = lastVal === '+' ? `${joinedString}+` : joinedString;

    setFormVal(newString);
    setLengths(lengths)
  }, [initVar]);

  const multiInputBlur = useCallback((val) => {
    const [strLength, lastVal, lengths] = initVar(val);

    let newString;
    let newLength = lengths;
    if( lastVal === '+' &&
       lengths.length % 2 === 0 ) {
      newString = val.slice( 0, strLength -1 )
    } else if( lengths.length % 2 !== 0 ) {
      newString = lastVal === '+' ?
        val + defaultVal.break :
        val + `+${defaultVal.break}`;
      newLength.push(defaultVal.break);
    } else newString = val;

    setFormVal(newString);
    setLengths(newLength)
  }, [initVar]);

  return [
    formVal,
    lengths,
    multiInputChange,
    multiInputBlur
  ];
}


export const useLocalStorage = (key, initialValue) => {
  //initialize state
  const [storageVal, setStorageVal] = useState(initialValue);

  useEffect(() => {
    const userPref = localStorage.getItem(key);
    // Parse stored json or if none return initialValue

    setStorageVal( userPref ? JSON.parse(userPref) : initialValue)
  }, [initialValue, key])

  // add new value to localStorage
  const setStorage = useCallback(val => {
    //set localStorage only when user change something
    const differences = Object.keys(val).filter(el => val[el] !== storageVal[el]);
    if(differences.length > 0)
      localStorage.setItem(key, JSON.stringify(val));
    else return;
  }, [key, storageVal])

  return [storageVal, setStorage];
}
