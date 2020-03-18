import React from 'react';
import Control from './Control/Control';
import { controls } from '../../template/controls';

const Controls = props => {
  return (
    <div id="ControlsBlock">
      {controls[props.status].map(
        el =>
          <Control
            addClass={props.active === el.type ? 'activeLoop' : ''}
            controlsClick={props.controlsClick}
            key={el.type}
            controlType={el.type}
            icon={el.icon} />
        ) }
    </div>
  )
};

export default React.memo(Controls);
