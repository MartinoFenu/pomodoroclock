import React from 'react';

const Input = props => {
  let inputElement = null;
  switch (props.body.type) {
    case ('text'):
    case ('checkbox'):
      inputElement = <input
        {...props.body}/>;
      break;
    case ('select'):
      inputElement = (
        <select
          value={props.body.value}
          name={props.body.name}
          onChange={props.body.onChange}
          className={props.addClass}
           >
          {props.body.options.map(option => (
            <option
              key={option.value}
              value={option.value}>
                {option.displayValue}
            </option>
          )) }
        </select>
      );
      break;
    default:
      inputElement = <input
        name={props.body.name}
        className={props.addClass}
        {...props.body.elementAttributes}
        value={props.body.value}
        onChange={props.changed}/>;
  }

  return (
    <div className={['Input', props.body.type, props.addWrapClass].join(' ')}>
      {props.body.label ? <label className='Label'>{props.body.label}</label> : null}
      {inputElement}
    </div>
  );
}

export default Input;
