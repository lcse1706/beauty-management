import { useRef, FormEventHandler } from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { Button } from '../../UI/Button';
import { useDataContext } from '../Context/DataContext';
import { sendToAirtable } from '../../services/sendToAirtable';
import { Loader } from '../../UI/Loader';
import { useModalContext } from '../Context/ModalContext';
import './ReceiptForm.scss';

interface Receipt {
  fields: {
    receipt_id: string;
    name: string;
    email: string;
    treatment: string;
    price: string;
  };
}

export const ReceiptForm = () => {
  const { receipts, setLoading, loading } = useDataContext();
  const { setShowModal, setMessage } = useModalContext();

  const clearInputs = () => {
    if (clientNameRef.current && clientEmailRef.current && treatmentRef.current && priceRef.current) {
      clientNameRef.current.value = '';
      clientEmailRef.current.value = '';
      treatmentRef.current.value = '';
      priceRef.current.value = '';
    }
  };

  const clientNameRef = useRef<HTMLInputElement>(null);
  const clientEmailRef = useRef<HTMLInputElement>(null);
  const treatmentRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const inputValidator = (): boolean => {
    if (
      clientNameRef.current?.value.trim() === '' ||
      clientEmailRef.current?.value.trim() === '' ||
      treatmentRef.current?.value === '' ||
      priceRef.current?.value === ''
    ) {
      setMessage('Please fill all fields');
      return true;
    }
    return false;
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');

    if (inputValidator()) {
      setShowModal(true);
      return;
    }

    const data: Receipt = {
      fields: {
        receipt_id: receipts.length + 1 + '/' + new Date().getFullYear(),
        name: clientNameRef.current?.value ?? '',
        email: clientEmailRef.current?.value ?? '',
        treatment: treatmentRef.current?.value ?? '',
        price: priceRef.current?.value ?? '',
      },
    };

    const sendData = async () => {
      try {
        setLoading(true);
        await sendToAirtable(data);
        setMessage('Receipt successfully added !');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setShowModal(true);
      }
    };

    sendData();

    // Reset inputs
    clearInputs();
  };

  return (
    <div className="receiptFormWrapper">
      <form className="receiptForm" onSubmit={submitHandler}>
        <Input ref={clientNameRef} label="Client Name:" type="text" />
        <Input ref={clientEmailRef} label="Client Email:" type="email" />
        <Select ref={treatmentRef} label="Treatment:" options={['lashes', 'brows', 'nails']} />
        <Input ref={priceRef} label="Price:" type="number" />
        {loading ? (
          <Loader />
        ) : (
          <Button className="button is-rounded" type="submit">
            Send
          </Button>
        )}
      </form>
    </div>
  );
};
