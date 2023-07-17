import { LoginForm } from '../components/LoginForm';

import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const LoginPage = () => {
  const isAuth = localStorage.getItem('isAuth');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === 'true') {
      navigate('/sendreceipt');
    }
  }, []);

  return <LoginForm />;
};

export default LoginPage;
