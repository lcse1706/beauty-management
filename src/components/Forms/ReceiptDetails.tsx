import { Button } from '../../UI/Button';
import { deleteReceipt } from '../../services/deleteReceipt';
import { useDataContext } from '../Context/DataContext';
import './ReceiptDetails.scss';

export const ReceiptDetails = ({ data }: any) => {
  const receipt = data[0].fields;
  const { receiptId } = useDataContext();

  const deleteHandler = () => {
    deleteReceipt(receiptId);
  };

  return (
    <div>
      {receipt && (
        <div className="receiptDetails">
          <p>Receipt number: {receipt.receipt_id}</p>
          <p>Name: {receipt.name}</p>
          <p>Email: {receipt.email}</p>
          <p>Treatment: {receipt.treatment}</p>
          <p>Price: {receipt.price}</p>
          <Button className="bg-red-500 hover:bg-red-700" type="button" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
