import React from 'react';
import Timer from './Timer/Timer';
import { timers } from '../../template/timers';

const Timers = props => {
  return(
    <div className="Timers">
      {timers.map(
        el => <Timer
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
                key={el.label}
                name={el.id}
                newTime={props.handleClick}
                timerLabel={el.label}
                value={props[el.id]} />
      ) }
    </div>
  )
}

export default React.memo(Timers);
