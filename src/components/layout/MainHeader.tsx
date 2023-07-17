import { Navigation } from './navigation/Navigation';
import './MainHeader.scss';

const MainHeader = () => {
  return (
    <header className="mainNavHeader">
      <h1>Beauty Management</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
