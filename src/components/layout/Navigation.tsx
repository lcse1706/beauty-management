import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from '../../stories/Button';
import { useAuthContext } from '../Context/AuthContext';
import './Navigation.scss';

export const Navigation: React.FC = () => {
  const { isLogged, setIsLogged } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setIsLogged(false);
    sessionStorage.setItem('isAuth', 'false');
    navigate('/');
  };

  return (
    <nav className="mainNav">
      {isLogged && (
        <ul className="menu-list">
          <li>
            <NavLink to="/sendreceipt">Send Receipt</NavLink>
          </li>
          <li>
            <NavLink to="/receiptlist">Receipts</NavLink>
          </li>
          <li>
            <Button label="Log Out" onClick={logoutHandler} />
          </li>
        </ul>
      )}
    </nav>
  );
};
