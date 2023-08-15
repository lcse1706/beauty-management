import { useDataContext } from '../context/DataContext';
import { ReceiptDetails } from '../components/forms/ReceiptDetails';

export const DetailsPage = () => {
  const { receiptId, receipts } = useDataContext();

  const getData = () => {
    const data = receipts.filter((receipt) => receipt.id === receiptId);
    return data;
  };

  return (
    <div>
      <h2 className="text-xl color-black font-bold mb-4 text-center text-white">Details</h2>
      <ReceiptDetails data={getData()} />
    </div>
  );
};
