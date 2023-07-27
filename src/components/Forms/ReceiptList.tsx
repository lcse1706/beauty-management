import { useEffect } from 'react';
import { ReceiptDisplayForm } from './ReceiptDisplayForm';
import { fetchReceipts } from '../../services/fetchReceipts';
import { useDataContext } from '../Context/DataContext';
import { Loader } from '../../UI/Loader';
import './ReceiptList.scss';

export const ReceiptList = () => {
  const { receipts, setReceipts, loading, setLoading } = useDataContext();

  const fetchData = async () => {
    try {
      setLoading(true);
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
      {loading ? <Loader /> : receipts.map((receipt) => <ReceiptDisplayForm key={receipt.id} data={receipt} />)}
    </div>
  );
};
