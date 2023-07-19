import { useDataContext } from '../components/Context/DataContext';
import { ReceiptDetails } from '../components/Forms/ReceiptDetails';

export const DetailsPage = () => {
  const { receiptId, receipts } = useDataContext();

  const getData = () => {
    const data = receipts.filter((receipt) => receipt.id === receiptId);
    return data;
  };

  return <ReceiptDetails data={getData()} />;
};
