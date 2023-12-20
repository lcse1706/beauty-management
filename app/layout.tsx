import React from 'react';

//TODO fix issue "ReferenceError: Cannot access 'Navigation' before initialization"
import { Header, Navigation, Popup } from '@/components/ui';
import { usePopupContext } from '@/context';

import './globals.css';
import { Providers } from './providers';

export const metadata = {
    title: 'Beauty Management',
    description: 'Beauty Management App',
};

//FIXME CSS: page height over 100 vh

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
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
