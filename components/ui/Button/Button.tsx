import React, { ComponentProps } from 'react';
import './button.css';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
}

const BASE_BUTTON_CLASSES = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1';

export const Button = React.memo(({ label, className, ...rest }: ComponentProps<'button'> & ButtonProps) => {
  return (
    <button type="button" className={[BASE_BUTTON_CLASSES, className].filter(Boolean).join(' ')} {...rest}>
      {label}
    </button>
  );
});
