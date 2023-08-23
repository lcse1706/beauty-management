'use client';

import { LoginForm } from '../src/components/forms/LoginForm';
import { useRouter } from 'next/navigation';
// import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const LoginPage = () => {
  const isAuth = sessionStorage.getItem('isAuth');
  const router = useRouter();

  useEffect(() => {
    if (isAuth === 'true') {
      router.push('/sendreceipt');
    }
  }, []);

  return <LoginForm />;
};

export default LoginPage;
