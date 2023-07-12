import Button from '../../../UI/Button';
import './Navigation.scss';

const Navigation = (props: { isLoggedIn: boolean; onLogout: any }) => {
  return (
    <nav className="mainNav">
      <ul className="menu-list">
        {props.isLoggedIn && (
          <li>
            <a href="/">Receipts</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Send Receipt</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <Button type="button" className="button is-small is-rounded" onClick={props.onLogout}>
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
