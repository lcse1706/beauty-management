import { Outlet } from 'react-router-dom';
import { Header } from '../../ui/Header';
import { Navigation } from './Navigation';

export const RootLayout = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
