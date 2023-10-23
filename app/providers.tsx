import React from 'react';

import { AuthProvider, DataProvider, PopupProvider } from '@/context';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <DataProvider>
                <PopupProvider>{children}</PopupProvider>
            </DataProvider>
        </AuthProvider>
    );
};
