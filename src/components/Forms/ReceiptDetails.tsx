import { useState } from 'react';
import { Button } from '../../UI/Button';
import { deleteReceipt } from '../../services/deleteReceipt';
import { updateRecord } from '../../services/updateRecord';
import { useDataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router';
import { Input } from '../../UI/Input';
import './ReceiptDetails.scss';

export const ReceiptDetails = ({ data }: any) => {
  const [receipt, setReceipt] = useState(data[0].fields);
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
    console.log(receipt);
  };

  const saveHandler = async () => {
    setIsEditing(false);

    const formatedData = {
      fields: {
        name: receipt.name,
        receipt_id: receipt.receipt_id,
        treatment: receipt.treatment,
        email: receipt.email,
        price: receipt.price,
      },
    };
    try {
      await updateRecord(receiptId, formatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (event: any, field: any) => {
    setReceipt({
      ...receipt,
      [field]: event.target.value,
    });
  };

  const inputs = (
    <div>
      <Input
        label="Receipt number:"
        type="text"
        value={receipt.receipt_id}
        onChange={(event) => onChangeHandler(event, 'receipt_id')}
      ></Input>
      <Input
        label="Name: "
        type="text"
        value={receipt.name}
        onChange={(event) => onChangeHandler(event, 'name')}
      ></Input>
      <Input
        label="Email: "
        type="email"
        value={receipt.email}
        onChange={(event) => onChangeHandler(event, 'email')}
      ></Input>
      <Input
        label="Treatment: "
        type="text"
        value={receipt.treatment}
        onChange={(event) => onChangeHandler(event, 'treatment')}
      ></Input>
      <Input
        label="Price"
        type="text"
        value={receipt.price}
        onChange={(event) => onChangeHandler(event, 'price')}
      ></Input>
    </div>
  );

  const paragraphs = (
    <div>
      <p>Receipt number: {receipt.receipt_id}</p>
      <p>Name: {receipt.name}</p>
      <p>Email: {receipt.email}</p>
      <p>Treatment: {receipt.treatment}</p>
      <p>Price: {receipt.price}</p>
    </div>
  );

  return (
    <div>
      {receipt && (
        <div className="receiptDetails">
          {isEditing ? inputs : paragraphs}

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
