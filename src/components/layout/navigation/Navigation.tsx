import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from '../../../UI/Button';
import { useAuthContext } from '../../Auth/AuthContext';
import './Navigation.scss';

export const Navigation: React.FC = () => {
  const { isLogged, setIsLogged } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setIsLogged(false);
    localStorage.setItem('isAuth', 'false');
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
            <Button type="button" className="button is-small is-rounded" onClick={logoutHandler}>
              Logout
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
};
