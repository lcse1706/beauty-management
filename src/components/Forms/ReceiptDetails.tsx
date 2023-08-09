import { useState } from 'react';
import { Button } from '../../stories/Button';
import { deleteReceipt } from '../../services/deleteReceipt';
import { updateRecord } from '../../services/updateRecord';
import { useDataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router';
import { Input } from '../../stories/Input';
import { Loader } from '../../UI/Loader';
import { usePopupContext } from '../Context/PopupContext';
import { z } from 'zod';
import './ReceiptDetails.scss';

const ReceiptZOD = z.object({
  fields: z.object({
    receipt_id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    treatment: z.string(),
    price: z.string(),
  }),
});

export const ReceiptDetails = ({ data }: any) => {
  const [receipt, setReceipt] = useState(data[0].fields);
  const { receiptId, loading, setLoading } = useDataContext();
  const { setShowPopup, setMessage } = usePopupContext();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this receipt?');
    if (!isConfirmed) {
      return;
    }

    setLoading(true);
    try {
      await deleteReceipt(receiptId);
      setMessage('Receipt delete successful !');
      navigate('/receiptlist');
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong !');
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const saveHandler = async () => {
    setIsEditing(false);
    setLoading(true);

    const formatedData = {
      fields: {
        name: receipt.name,
        receipt_id: receipt.receipt_id,
        treatment: receipt.treatment,
        email: receipt.email,
        price: receipt.price,
      },
    };

    const parsedData = ReceiptZOD.parse(formatedData);

    try {
      await updateRecord(receiptId, parsedData);
      setMessage('Receipt edit successful !');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowPopup(true);
    }
  };

  const backHandler = () => {
    navigate(-1);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
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
    <div className="max-w-md mx-auto p-5 bg-white rounded shadow-md border border-gray-200">
      <h1 className="text-xl color-black font-bold mb-4 text-center text-gray-700">Customer Receipt</h1>
      <hr className="mb-4" />
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Receipt number:</span>
        <span className="text-gray-900">{receipt.receipt_id}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Name:</span>
        <span className="text-gray-900">{receipt.name}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Email:</span>
        <span className="text-gray-900">{receipt.email}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Treatment:</span>
        <span className="text-gray-900">{receipt.treatment}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 font-semibold">Price:</span>
        <span className="text-gray-900 font-semibold">{receipt.price} kr</span>
      </div>
    </div>
  );

  const buttons = (
    <div>
      {isEditing ? (
        <Button className="bg-green-500 hover:bg-green-700" label="Save" onClick={saveHandler} />
      ) : (
        <>
          <Button label="<<<" onClick={backHandler} />
          <Button label="Edit" onClick={editHandler} />
          <Button className="bg-red-500 hover:bg-red-700 my-2" label="Delete" onClick={deleteHandler} />
        </>
      )}
    </div>
  );

  return (
    <div>
      {receipt && (
        <div className="receiptDetails">
          {isEditing ? inputs : paragraphs}

          {loading ? <Loader /> : buttons}
        </div>
      )}
    </div>
  );
};
