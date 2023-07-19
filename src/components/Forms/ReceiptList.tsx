import { useEffect, useState } from 'react';
import { ReceiptDisplayForm } from './ReceiptDisplayForm';
import { fetchReceipts } from '../../services/receipts';
import './ReceiptList.scss';
import { useDataContext } from '../Context/DataContext';

interface Receipt {
  id: string;
  fields: {
    receipt_id: string;
    name: string;
    email: string;
    threatment: string;
    price: number;
    date: string;
  };
}

export const ReceiptList = () => {
  // const [receipts1, setReceipts1] = useState<Receipt[]>([]);
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
      <h2>Receipts</h2>
      {loading ? <p>Loading...</p> : receipts.map((receipt) => <ReceiptDisplayForm key={receipt.id} data={receipt} />)}
    </div>
  );
};
