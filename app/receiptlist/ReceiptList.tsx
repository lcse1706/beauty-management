'use client';

import React from 'react';
import { useEffect } from 'react';
import { ReceiptDisplayForm } from './ReceiptDisplayForm';
import { fetchReceipts } from '../../services/receipts';
import { Loader } from '../../components/ui';
import { sortReceipts } from '../../components/utils/sortReceipts';
import { usePopupContext } from '../../context/PopupContext';
import { useAuthContext } from '../../context/AuthContext';
import { useDataContext } from '../../context/DataContext';
import { useRouter } from 'next/navigation';
import './ReceiptList.scss';

export const ReceiptList = () => {
  const { receipts, setReceipts, loading, setLoading } = useDataContext();
  const { setShowPopup, setMessage } = usePopupContext();

  //Moved from page.tsx to hide useEffect in client component

  const { isLogged } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/');
    }
  }, []);

  /////////////////////////////////////////////////////////////

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchReceipts();

      if (Array.isArray(data)) {
        setReceipts(data);
      }
    } catch (error) {
      setShowPopup(true);
      setMessage('Something went wrong !');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedReceipts = sortReceipts(receipts);

  return (
    <ul className="receiptList space-y-4 p-4 bg-gray-100 rounded-lg">
      {loading ? <Loader /> : sortedReceipts.map((receipt) => <ReceiptDisplayForm key={receipt.id} data={receipt} />)}
    </ul>
  );
};
