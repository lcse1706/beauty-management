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



  const sortedReceipts = [...receipts].sort((a, b) => {
    const [numberA, monthA, yearA] = a.fields.receipt_id.split('/').map((num) => parseInt(num));
    const [numberB, monthB, yearB] = b.fields.receipt_id.split('/').map((num) => parseInt(num));

    if (yearA !== yearB) return yearA - yearB;
    if (monthA !== monthB) return monthA - monthB;
    return numberA - numberB;
  });

  return (
    <ul className="receiptList space-y-4 p-4 bg-gray-100 rounded-lg">
      {loading ? <Loader /> : sortedReceipts.map((receipt) => <ReceiptDisplayForm key={receipt.id} data={receipt} />)}
    </ul>
  );
};
