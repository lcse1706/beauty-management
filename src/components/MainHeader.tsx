import Navigation from './Navigation';
import './MainHeader.scss';

const MainHeader = (props: { isAuthenticated: boolean; onLogout: any }) => {
  return (
    <header className="mainNavHeader">
      <h1>Beauty Management</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
