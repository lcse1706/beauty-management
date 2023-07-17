import { useEffect, useState } from 'react';
import { ReceiptDetails } from './ReceiptDetails';
import { useHttp } from '../hooks/useHttp';
import './ReceiptList.scss';

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
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = await useHttp();

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        receipts.map((receipt) => <ReceiptDetails key={receipt.id} data={receipt.fields} />)
      )}
    </div>
  );
};
