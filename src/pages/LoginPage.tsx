import { LoginForm } from '../components/Forms/LoginForm';

import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const LoginPage = () => {
  const isAuth = sessionStorage.getItem('isAuth');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === 'true') {
      navigate('/sendreceipt');
    }
  }, []);

  return <LoginForm />;
};
