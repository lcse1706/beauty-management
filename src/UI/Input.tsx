import { ChangeEvent, forwardRef, Ref } from 'react';
import './Input.scss';
import { useForm } from 'react-hook-form';

interface InputProps {
  label: string;
  type: string;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

type FormValues = {
  input: string;
};

export const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <div className={`input ${props.className}`}>
      <label>{props.label}</label>
      <input {...register('input')} ref={ref} type={props.type} onChange={props.onChange} value={props.value}></input>
    </div>
  );
});

Input.displayName = 'forwardRef (Input)';
