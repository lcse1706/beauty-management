import React from 'react';
import './button.css';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */

const BASE_BUTTON_CLASSES = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full';

export const Button = ({ primary = false, size = 'medium', label, className, ...props }: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode, BASE_BUTTON_CLASSES, `${className}`].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
