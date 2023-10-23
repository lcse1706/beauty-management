import React from 'react';

import { Header, Navigation, Popup } from '@/components/ui';
import { usePopupContext } from '@/context';

import './globals.css';
import { Providers } from './providers';

export const metadata = {
    title: 'Beauty Management',
    description: 'Beauty Management App',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
