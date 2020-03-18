import React from 'react';

const Button = props => {
  return(
    <button
      disabled={props.disabled}
      type={props.type}
      title={props.title}
      value={props.value}
      name={'' || props.name}
      className={['Btn', [props.btnType]].join(' ')}
      onClick={props.click} >
      {props.children}
    </button>
  );
};

export default Button;
