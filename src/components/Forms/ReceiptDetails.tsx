import { Button } from '../../UI/Button';
import './ReceiptDetails.scss';

export const ReceiptDetails = ({ data }: any) => {
  const receipt = data[0].fields;
  return (
    <div>
      {receipt && (
        <div className="receiptDetails">
          <p>Receipt number: {receipt.receipt_id}</p>
          <p>Name: {receipt.name}</p>
          <p>Email: {receipt.email}</p>
          <p>Treatment: {receipt.treatment}</p>
          <p>Price: {receipt.price}</p>
          <Button className="bg-red-500 hover:bg-red-700" type="button">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
