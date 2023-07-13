import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';

import { useState } from 'react';
import ReceiptPage from './pages/ReceiptPage';
import './App.scss';
import MainHeader from './components/layout/MainHeader';
import LoginPage from './pages/LoginPage';
import ReceiptDetails from './components/ReceiptDetails';
import ReceiptList from './components/ReceiptList';
import { ContextApi } from './components/Context/ContextApi';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      // { path: 'sendreceipt', element: <ReceiptPage /> },
      { path: 'receiptlist', element: <ReceiptList /> },
    ],
  },
]);

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  return (
    <ContextApi.Provider value={{ isLoggedin, setIsLoggedIn }}>
      <RouterProvider router={router} />;
    </ContextApi.Provider>
  );
};

export default App;

// const App = () => {
//   const [isLoggedin, setIsLoggedIn] = useState(true);

//   const loginHandler = (auth: boolean) => {
//     setIsLoggedIn(auth);
//   };

//   const logoutHandler = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <div>
//       {isLoggedin && <MainHeader isAuthenticated={isLoggedin} onLogout={logoutHandler} />}
//       {isLoggedin ? <ReceiptPage /> : <LoginPage loginHandler={loginHandler} />}
//       <ReceiptList />
//     </div>
//   );
// };

// export default App;
