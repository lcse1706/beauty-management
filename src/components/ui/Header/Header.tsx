import type { ComponentProps } from 'react';
import Image from 'next/image';
import logo from '../../layout/diamentnobgwhite.png';
import './header.css';

export const Header = ({ children }: ComponentProps<'header'>) => {
  return (
    <header className="mainNavHeader">
      <h1>
        <Image className="scale" src={logo} alt="Logo Beauty by EC" />
        Beauty Management
      </h1>
      {children}
    </header>
  );
};
