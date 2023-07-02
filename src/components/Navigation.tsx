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
            <button className="button is-small" onClick={props.onLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
