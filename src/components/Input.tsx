import React, { Ref } from 'react';
import './Input.scss';

interface inputProps {
  label: string;
  type: string;
  //TODO: ask if we need to type such function
  onChange?: () => void;
}

const Input = React.forwardRef((props: inputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <div className="input">
      <label>{props.label}</label>
      <input ref={ref} type={props.type} onChange={props.onChange}></input>
    </div>
  );
});

Input.displayName = 'forwardRef (Input)';

export default Input;
