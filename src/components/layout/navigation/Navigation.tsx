import { useContext } from 'react';
import { ContextApi } from '../../Context/ContextApi';
import Button from '../../../UI/Button';
import './Navigation.scss';

const Navigation = () => {
  const { isLoggedin, setIsLoggedIn } = useContext(ContextApi);

  return (
    <nav className="mainNav">
      {isLoggedin && (
        <ul className="menu-list">
          <li>
            <a href="/">Receipts</a>
          </li>
          <li>
            <a href="/">Send Receipt</a>
          </li>
          <li>
            <Button
              type="button"
              className="button is-small is-rounded"
              onClick={() => {
                setIsLoggedIn(false);
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
