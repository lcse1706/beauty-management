import React, { ComponentProps } from 'react';
import './button.css';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
}

const BASE_BUTTON_CLASSES = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-1';

export const Button = ({ primary = false, label, className, ...rest }: ComponentProps<'button'> & ButtonProps) => {
  // const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button type="button" className={[BASE_BUTTON_CLASSES, `${className}`].join(' ')} {...rest}>
      {label}
    </button>
  );
};
