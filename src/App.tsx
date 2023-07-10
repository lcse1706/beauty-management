import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import ReceiptPage from './pages/ReceiptPage';
import './App.scss';
import MainHeader from './components/MainHeader';
import LoginPage from './pages/LoginPage';
import ReceiptDetails from './components/ReceiptDetails';
import ReceiptList from './components/ReceiptList';

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(true);

  const loginHandler = (auth: boolean) => {
    setIsLoggedIn(auth);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedin && <MainHeader isAuthenticated={isLoggedin} onLogout={logoutHandler} />}
      {isLoggedin ? <ReceiptPage /> : <LoginPage loginHandler={loginHandler} />}
      <ReceiptList />
    </div>
  );
};

export default App;
