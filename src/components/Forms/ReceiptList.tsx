import { useEffect, useState } from 'react';
import { ReceiptDisplayForm } from './ReceiptDisplayForm';
import { fetchReceipts } from '../../services/fetchReceipts';
import { useDataContext } from '../Context/DataContext';
import './ReceiptList.scss';

export const ReceiptList = () => {
  const [loading, setLoading] = useState(true);
  const { receipts, setReceipts } = useDataContext();

  const fetchData = async () => {
    try {
      const data = await fetchReceipts();

      if (Array.isArray(data)) {
        setReceipts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="receiptList">
      {loading ? <p>Loading...</p> : receipts.map((receipt) => <ReceiptDisplayForm key={receipt.id} data={receipt} />)}
    </div>
  );
};
