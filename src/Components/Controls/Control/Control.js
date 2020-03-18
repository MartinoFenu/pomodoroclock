import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../UI/Button/Button';

const Control = props => {
  return (
    <Button
      btnType={props.addClass}
      click={props.controlsClick}
      title={props.controlType}
      value={props.controlType} >
      <FontAwesomeIcon
        icon={props.icon}>
      </FontAwesomeIcon>
    </Button>
  )
};

export default React.memo(Control);
