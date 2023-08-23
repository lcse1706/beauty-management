'use-client';

import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';
import { DataProvider } from '../src/context/DataContext';
import { PopupProvider } from '../src/context/PopupContext';

export const Providers = ({ children }: any) => {
  return (
    <AuthProvider>
      <DataProvider>
        <PopupProvider>{children}</PopupProvider>
      </DataProvider>
    </AuthProvider>
  );
};
