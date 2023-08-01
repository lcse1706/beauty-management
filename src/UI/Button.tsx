import React, { ComponentProps } from 'react';

interface ButtonProps {
  // type: 'button' | 'submit' | 'reset';
  children: string | undefined;
  // className?: string;
  // onClick?: () => void;
}
export const Button = ({ type, className, onClick, children, ...rest }: ComponentProps<'button'> & ButtonProps) => {
  const classes = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`;

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
