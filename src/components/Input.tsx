import React, { Ref } from 'react';
import './Input.css';

interface inputProps {
  label: string;
  type: string;
}

// dlaczego jak wpisuje HTMLInputElement to err
const Input = React.forwardRef(
  (props: inputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className='input'>
        <label>{props.label}</label>
        <input ref={ref} type={props.type}></input>
      </div>
    );
  }
);

Input.displayName = 'forwardRef (Input)';

export default Input;
