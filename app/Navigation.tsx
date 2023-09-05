'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from '../components/ui';
import { useAuthContext } from '../context/AuthContext';
import './Navigation.scss';

export const Navigation: React.FC = () => {
  const { isLogged, setIsLogged } = useAuthContext();
  const router = useRouter();

  const logoutHandler = () => {
    setIsLogged(false);
    sessionStorage.setItem('isAuth', 'false');
    router.push('/');
  };

  const classes = 'text-white hover:text-gray-400 font-medium';

  return (
    <nav className="flex flex-row">
      {isLogged && (
        <ul className="flex flex-row items-center space-x-5  ">
          <li className="">
            {/* <NavLink to="/sendreceipt" className={({ isActive }) => `${classes} ${isActive ? 'active-class' : ''}`}> */}
            <Link href="/sendreceipt">Send Receipt</Link>
          </li>
          <li>
            {/* <NavLink to="/receiptlist" className={({ isActive }) => `${classes} ${isActive ? 'active-class' : ''}`}> */}
            <Link href="/receiptlist">Receipts</Link>
          </li>
          <li>
            <Button label="Log Out" onClick={logoutHandler} />
          </li>
        </ul>
      )}
    </nav>
  );
};
