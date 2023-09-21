import React from 'react';
import { Providers } from './providers';
import { Header, Popup } from '../components/ui';
import { Navigation } from './Navigation';
import { usePopupContext } from '../context/PopupContext';
import './globals.css';

export const metadata = {
  title: 'Beauty Management',
  description: 'Beauty Managenet App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header>
            <Navigation />
          </Header>
          <div className="container">{children}</div>
          <Popup useContext={usePopupContext} />
        </Providers>
      </body>
    </html>
  );
}
