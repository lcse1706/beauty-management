import { useContext } from 'react';
import { ContextApi } from '../../Context/ContextApi';
import { useNavigate, NavLink } from 'react-router-dom';

import Button from '../../../UI/Button';
import './Navigation.scss';

const Navigation = () => {
  const { isLoggedin, setIsLoggedIn } = useContext(ContextApi);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="mainNav">
      {isLoggedin && (
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

export default Navigation;
