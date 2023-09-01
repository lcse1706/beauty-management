'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../components/context/AuthContext';
import { ReceiptForm } from './ReceiptForm';
import styles from './ReceiptPage.module.css';
import React from 'react';

const ReceiptPage = () => {
  const { isLogged } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/');
    }
  }, []);

  return (
    <div className={styles.receiptWrapper}>
      <h2 className="text-xl color-black font-bold mb-4 text-center text-white">Receipt Page</h2>
      <ReceiptForm />
    </div>
  );
};

export default ReceiptPage;
