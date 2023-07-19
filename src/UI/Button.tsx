import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: any;
}
export const Button: React.FC<ButtonProps> = ({ type, className, onClick, children }) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
