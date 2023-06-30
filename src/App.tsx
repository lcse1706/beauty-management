import React from 'react';
import { useState } from 'react';
import ReceiptPage from './pages/ReceiptPage';
import './App.css';
import MainHeader from './components/MainHeader';
import Login from './components/Login';

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
      {isLoggedin && (
        <MainHeader isAuthenticated={isLoggedin} onLogout={logoutHandler} />
      )}
      {isLoggedin ? <ReceiptPage /> : <Login loginHandler={loginHandler} />}
    </div>
  );
};

export default App;
