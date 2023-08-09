import type { ComponentProps } from 'react';
import logo from './../components/layout/logowhite.png';
import './header.css';

export const Header = ({ children }: ComponentProps<'header'>) => {
  return (
    <header className="mainNavHeader">
      {/* <img className="scale" src={logo} alt="Logo Beauty by EC" /> */}
      <h1>Beauty Management</h1>
      {children}
    </header>
  );
};
