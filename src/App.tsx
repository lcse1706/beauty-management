import React from 'react';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import ReceiptPage from './pages/ReceiptPage';
import LoginPage from './pages/LoginPage';
import ReceiptListPage from './pages/ReceiptListPage';
import { ContextApi } from './components/Context/ContextApi';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'sendreceipt', element: <ReceiptPage /> },
      { path: 'receiptlist', element: <ReceiptListPage /> },
    ],
  },
]);

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  return (
    <ContextApi.Provider value={{ isLoggedin, setIsLoggedIn }}>
      <RouterProvider router={router} />;
    </ContextApi.Provider>
  );
};

export default App;
