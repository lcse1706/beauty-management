'use client';

import { isMobile } from 'react-device-detect';

import { useAuthContext } from '@/context';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { NavigationDesktop } from './NavigationDesktop';
import { NavigationMobile } from './NavigationMobile';

export const Navigation: React.FC = () => {
    const { isLogged } = useAuthContext();

    const breakpoint768 = useMediaQuery(768);

    return (
        <nav className="flex flex-row">
            {isLogged &&
                (isMobile ? <NavigationMobile /> : <NavigationDesktop />)}
        </nav>
    );
};
