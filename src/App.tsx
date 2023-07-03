import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import ReceiptPage from './pages/ReceiptPage';
import './App.scss';
import MainHeader from './components/MainHeader';
import LoginForm from './components/LoginForm';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false);

  const loginHandler = (Auth: boolean) => {
    setIsLoggedIn(Auth);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedin && <MainHeader isAuthenticated={isLoggedin} onLogout={logoutHandler} />}
      {isLoggedin ? <ReceiptPage /> : <LoginPage loginHandler={loginHandler} />}
    </div>
  );
};

export default App;
