import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from '../../stories/Button';
import { useAuthContext } from '../context/AuthContext';
import './Navigation.scss';

export const Navigation: React.FC = () => {
  const { isLogged, setIsLogged } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setIsLogged(false);
    sessionStorage.setItem('isAuth', 'false');
    navigate('/');
  };

  const classes = 'text-white hover:text-gray-400 font-medium';

  return (
    <nav className="flex flex-row">
      {isLogged && (
        <ul className="flex flex-row items-center space-x-5  ">
          <li className="">
            <NavLink to="/sendreceipt" className={({ isActive }) => `${classes} ${isActive ? 'active-class' : ''}`}>
              Send Receipt
            </NavLink>
          </li>
          <li>
            <NavLink to="/receiptlist" className={({ isActive }) => `${classes} ${isActive ? 'active-class' : ''}`}>
              Receipts
            </NavLink>
          </li>
          <li>
            <Button label="Log Out" onClick={logoutHandler} />
          </li>
        </ul>
      )}
    </nav>
  );
};
