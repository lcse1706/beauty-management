'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../components/ui';
import { useAuthContext } from '../context/AuthContext';

export const Navigation: React.FC = () => {
  const { isLogged, setIsLogged } = useAuthContext();
  const router = useRouter();
  const path = usePathname();

  const isActive = (href: string) => {
    return path === href ? 'active-class' : '';
  };

  const logoutHandler = () => {
    setIsLogged(false);
    sessionStorage.setItem('isAuth', 'false');
    router.push('/');
  };

  return (
    <nav className="flex flex-row">
      {isLogged && (
        <ul className="flex flex-row items-center space-x-5  ">
          <li className="">
            <Link
              href="/sendreceipt"
              className={`text-white hover:text-gray-400 font-medium ${isActive('/sendreceipt')}`}
            >
              Send Receipt
            </Link>
          </li>
          <li>
            <Link
              href="/receiptlist"
              className={`text-white hover:text-gray-400 font-medium ${isActive('/receiptlist')}`}
            >
              Receipts
            </Link>
          </li>
          <li>
            <Button label="Log Out" onClick={logoutHandler} />
          </li>
        </ul>
      )}
    </nav>
  );
};
