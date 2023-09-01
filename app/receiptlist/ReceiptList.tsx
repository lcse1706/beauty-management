'use client';

import { useEffect } from 'react';
import { ReceiptDisplayForm } from './ReceiptDisplayForm';
import { fetchReceipts } from '../components/services/receipts';
import { useDataContext } from '../components/context/DataContext';
import { Loader } from '../components/ui';
import { sortReceipts } from '../components/utils/sortReceipts';
import './ReceiptList.scss';
import { usePopupContext } from '../components/context/PopupContext';
import React from 'react';

export const ReceiptList = () => {
  const { receipts, setReceipts, loading, setLoading } = useDataContext();
  const { setShowPopup, setMessage } = usePopupContext();

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
