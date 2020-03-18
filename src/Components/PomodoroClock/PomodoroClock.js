import React, { useEffect } from 'react';
import Controls from '../Controls/Controls';
import Timers from '../Timers/Timers';
import ClockFace from '../ClockFace/ClockFace';
import Button from '../UI/Button/Button';

import { usePomodoroClock } from '../../hooks/usePomodoroClock';

import { useFormatTime } from '../../hooks/hooks';

const PomodoroClock = props => {
  const pomClock = usePomodoroClock();
  const formatted =
   useFormatTime(pomClock.timeLeft);

   useEffect(() => {
     document.title = props.showOnTitle ? formatted : 'Pomodoro Clock';
   }, [props.showOnTitle, formatted]);

   const timers = pomClock.isSingle ?
      <Timers
        breakLength={pomClock.breakLength}
        sessionLength={pomClock.sessionLength}
        handleClick={pomClock.handleClickChange}
        handleChange={pomClock.handleChange}
        handleBlur={pomClock.handleBlur} /> :
     <input
       disabled={pomClock.isRunning}
       type="text"
       value={pomClock.multiplePom}
       onChange={pomClock.handleChange}
       onBlur={pomClock.handleBlur}
        />
  return (
    <div>
      <div className="PomodoroType">
        <Button
          click={pomClock.handlePomType}
          value="Single" >Single
        </Button>
        <Button
          click={pomClock.handlePomType}
          value="Multiple" >Multiple
        </Button>
      </div>
      <div className="TimersBox">
        {timers}
      </div>
      <ClockFace
        timerLabel={ pomClock.isBreakTime ? 'Break' : 'Session'}
        timer={formatted}
        elapsed={pomClock.calcElapsedTime()}
        timeStyle={pomClock.timeLeft < 60000 ? 'redTimer' : 'normal'} />
      <Controls
        active={pomClock.isLooping ? 'loop' : null}
        status={pomClock.isRunning ? 'running' : 'paused'}
        controlsClick={pomClock.handleControls}/>
      <audio
        ref={pomClock.audioRef}
        id="Alarm" >
        <source src={`/assets/${props.audioSettings}.mp3`} type="audio/mp3" /></audio>
    </div>
  )
}

export default React.memo(PomodoroClock);
