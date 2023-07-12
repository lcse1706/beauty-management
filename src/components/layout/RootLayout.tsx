import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';

const RootLayout = () => {
  return (
    <>
      {/* <MainHeader /> */}
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
