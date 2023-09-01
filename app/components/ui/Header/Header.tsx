import type { ComponentProps } from 'react';
import Image from 'next/image';
import logo from './logo.png';
import './header.css';

export const Header = ({ children }: ComponentProps<'header'>) => {
  return (
    <header className="mainNavHeader">
      <h1>
        <Image src={logo} alt="Logo Beauty by EC" placeholder="blur" width={70} className="inline mr-3" />
        Beauty Management
      </h1>
      {children}
    </header>
  );
};
