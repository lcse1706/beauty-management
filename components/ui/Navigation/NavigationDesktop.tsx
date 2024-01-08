import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthContext } from '@/context';

import { Button } from '../Button';

export const NavigationDesktop = () => {
    const { logOut } = useAuthContext();

    const router = useRouter();
    const path = usePathname();

    const logoutHandler = () => {
        logOut();
        sessionStorage.setItem('isAuth', 'false');
        router.push('/');
    };

    const isActive = (href: string) => {
        return path === href ? 'border-b border-white' : '';
    };

    return (
        <ul className="flex flex-row items-center space-x-5  ">
            <li className="">
                <Link
                    href="/sendreceipt"
                    className={`text-white hover:text-gray-400 font-medium ${isActive(
                        '/sendreceipt',
                    )}`}
                >
                    Send Receipt
                </Link>
            </li>
            <li>
                <Link
                    href="/receiptlist"
                    className={`text-white hover:text-gray-400 font-medium ${isActive(
                        '/receiptlist',
                    )}`}
                >
                    Receipts
                </Link>
            </li>
            <li>
                <Button label="Log Out" onClick={logoutHandler} />
            </li>
        </ul>
    );
};
