import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';

export const RootLayout = () => {
  return (
    <>
      <MainHeader />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
