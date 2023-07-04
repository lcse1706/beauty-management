import { ChangeEvent, forwardRef, Ref } from 'react';
import './Input.scss';

interface InputProps {
  label: string;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <div className="input">
      <label>{props.label}</label>
      <input ref={ref} type={props.type} onChange={props.onChange}></input>
    </div>
  );
});

Input.displayName = 'forwardRef (Input)';

export default Input;
