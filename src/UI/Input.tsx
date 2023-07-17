import { ChangeEvent, forwardRef, Ref } from 'react';
import './Input.scss';

interface InputProps {
  label: string;
  type: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <div className={`input ${props.className}`}>
      <label>{props.label}</label>
      <input ref={ref} type={props.type} onChange={props.onChange}></input>
    </div>
  );
});

Input.displayName = 'forwardRef (Input)';
