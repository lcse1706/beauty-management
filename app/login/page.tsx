'use client';

import { LoginForm } from './LoginForm';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

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
