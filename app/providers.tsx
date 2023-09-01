'use-client';

import React from 'react';
import { AuthProvider } from './components/context/AuthContext';
import { DataProvider } from './components/context/DataContext';
import { PopupProvider } from './components/context/PopupContext';

export const Providers = ({ children }: any) => {
  return (
    <AuthProvider>
      <DataProvider>
        <PopupProvider>{children}</PopupProvider>
      </DataProvider>
    </AuthProvider>
  );
};
