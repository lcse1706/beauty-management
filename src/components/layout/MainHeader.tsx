import { Navigation } from './Navigation';
import './MainHeader.scss';
import { Header } from '../../stories/Header';

//TODO Do usuniecia, jest w storkach

const MainHeader = () => {
  return (
    <Header>
      <Navigation />
    </Header>
  );
};

export default MainHeader;
