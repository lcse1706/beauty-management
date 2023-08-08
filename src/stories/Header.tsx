import type { ComponentProps } from 'react';
import './header.css';

export const Header = ({ children }: ComponentProps<'header'>) => {
  return (
    <header className="mainNavHeader">
      <h1>Beauty Management</h1>
      {children}
    </header>
  );
};
