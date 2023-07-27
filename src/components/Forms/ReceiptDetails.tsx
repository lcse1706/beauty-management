import { useState } from 'react';
import { Button } from '../../UI/Button';
import { deleteReceipt } from '../../services/deleteReceipt';
import { updateRecord } from '../../services/updateRecord';
import { useDataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router';
import { Input } from '../../UI/Input';
import './ReceiptDetails.scss';
import { Loader } from '../../UI/Loader';
import { useModalContext } from '../Context/ModalContext';

export const ReceiptDetails = ({ data }: any) => {
  const [receipt, setReceipt] = useState(data[0].fields);
  const { receiptId, loading, setLoading } = useDataContext();
  const { setShowModal, setMessage } = useModalContext();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = async () => {
    setLoading(true);
    try {
      await deleteReceipt(receiptId);
      setMessage('Receipt delete successful !');
      navigate('/receiptlist');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowModal(true);
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
    try {
      await updateRecord(receiptId, formatedData);
      setMessage('Receipt edit successful !');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowModal(true);
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

  const buttons = (
    <div>
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
