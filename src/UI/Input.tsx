import { ChangeEvent, forwardRef, Ref } from 'react';
import './Input.scss';

interface InputProps {
  label: string;
  type: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  register?: any;
}

export const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  return (
    <div className={`input ${props.className}`}>
      <label>{props.label}</label>
      <input ref={ref} type={props.type} onChange={props.onChange} value={props.value} {...props.register} />
    </div>
  );
});

Input.displayName = 'forwardRef (Input)';
