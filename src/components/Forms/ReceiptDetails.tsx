import { useState } from 'react';
import { Button, Input, Loader } from '../ui';
import { updateRecord, deleteReceipt } from '../../services/receipts';
import { useDataContext } from '../../context/DataContext';
import { usePopupContext } from '../../context/PopupContext';
import { useNavigate } from 'react-router';
import './ReceiptDetails.scss';

export const ReceiptDetails = ({ data }: any) => {
  const [receipt, setReceipt] = useState(data[0].fields);
  const { receiptId, loading, setLoading } = useDataContext();
  const { setShowPopup, setMessage } = usePopupContext();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = async () => {
    //TODO nicer modal for confirmation
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

    try {
      await updateRecord(receiptId, receipt);
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
