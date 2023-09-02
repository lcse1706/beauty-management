'use client';

import { LoginForm } from './LoginForm';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth === 'true') {
      router.push('/sendreceipt');
    }
  }, []);

  return <LoginForm />;
};

export default LoginPage;
