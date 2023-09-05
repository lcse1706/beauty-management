'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../context/AuthContext';
import { ReceiptList } from './ReceiptList';
import { useEffect } from 'react';
import React from 'react';

const ReceiptListPage = () => {
  const { isLogged } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/');
    }
  }, []);
  return (
    <div>
      <h2 className="text-xl color-black font-bold mb-4 text-center text-white">Receipts</h2>
      <ReceiptList />
    </div>
  );
};

export default ReceiptListPage;
