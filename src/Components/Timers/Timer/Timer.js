import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../UI/Button/Button';

const Timer = props => {
  return(
    <div>
      <h4>{props.timerLabel}</h4>
      <div className="timerBody">
        <Button
          name={props.name}
          value="dec"
          click={props.newTime} >
          <FontAwesomeIcon icon="arrow-down" />
        </Button>
        <input
          name={props.name}
          type="number"
          min="1"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.value} />
        <Button
          name={props.name}
          value="inc"
          click={props.newTime} >
          <FontAwesomeIcon icon="arrow-up" />
        </Button>
      </div>
    </div>
  )
}

export default React.memo(Timer);
