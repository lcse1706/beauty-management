'use-client';

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { DataProvider } from '../context/DataContext';
import { PopupProvider } from '../context/PopupContext';

export const Providers = ({ children }: any) => {
  return (
    <AuthProvider>
      <DataProvider>
        <PopupProvider>{children}</PopupProvider>
      </DataProvider>
    </AuthProvider>
  );
};
