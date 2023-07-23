import { useState } from 'react';
import { Button } from '../../UI/Button';
import { deleteReceipt } from '../../services/deleteReceipt';
import { updateRecord } from '../../services/updateRecord';
import { useDataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router';
import './ReceiptDetails.scss';

export const ReceiptDetails = ({ data }: any) => {
  const receipt = data[0].fields;
  const { receiptId } = useDataContext();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = async () => {
    try {
      await deleteReceipt(receiptId);
      navigate('/receiptlist');
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const saveHandler = async () => {
    setIsEditing(false);
    const data = {
      fields: {
        receipt_id: '9/999',
        name: 'Update Update',
        email: 'update@update.pl',
        treatment: 'nails',
        price: '9999',
      },
    };
    try {
      await updateRecord(receiptId, data);
    } catch (error) {
      console.error(error);
    }
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
          {isEditing ? (
            <Button type="button" onClick={saveHandler}>
              Save
            </Button>
          ) : (
            <Button type="button" onClick={editHandler}>
              Edit
            </Button>
          )}
          <Button className="bg-red-500 hover:bg-red-700" type="button" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
