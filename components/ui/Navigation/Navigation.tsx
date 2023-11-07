'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { useAuthContext } from '@/context';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { NavigationDesktop } from './NavigationDesktop';
import { NavigationMobile } from './NavigationMobile';

export const Navigation: React.FC = () => {
    const { isLogged, setIsLogged } = useAuthContext();
    // const router = useRouter();
    // const path = usePathname();
    const breakpoint768 = useMediaQuery(768);

    // const isActive = (href: string) => {
    //     return path === href ? 'border-b border-white' : '';
    // };

    // const logoutHandler = () => {
    //     setIsLogged(false);
    //     sessionStorage.setItem('isAuth', 'false');
    //     router.push('/');
    // };

    return (
        <nav className="flex flex-row">
            {isLogged &&
                (breakpoint768 ? <NavigationMobile /> : <NavigationDesktop />)}
        </nav>
    );
};
