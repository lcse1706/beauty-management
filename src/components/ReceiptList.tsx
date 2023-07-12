import { useEffect, useState } from 'react';
import ReceiptDetails from './ReceiptDetails';
import './ReceiptList.scss';
import { useHttp } from '../hooks/useHttp';

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

const ReceiptList = () => {
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
        receipts.map((receipt: any) => <ReceiptDetails key={receipt.id} data={receipt.fields} />)
      )}
    </div>
  );
};

export default ReceiptList;
