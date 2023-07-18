import { useRef, useState, useEffect, FormEventHandler } from 'react';
import { sendReceipt } from './sendReceipt';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import { useDataContext } from './Context/DataContext';
import './ReceiptForm.scss';

interface Receipt {
  receipt_id: string;
  name: string;
  email: string;
  treatment: string;
  price: string;
}

export const ReceiptForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { receiptsList } = useDataContext();

  const clearInputs = () => {
    if (clientNameRef.current && clientEmailRef.current && treatmentRef.current && priceRef.current) {
      clientNameRef.current.value = '';
      clientEmailRef.current.value = '';
      treatmentRef.current.value = '';
      priceRef.current.value = '';
    }
  };

  // useEffect(() => {
  //   // rerender receipt list
  //   console.dir(receiptsList);
  // }, [receiptsList]);

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
      setErrorMessage('Please fill all fields');
      return true;
    }
    return false;
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (inputValidator()) {
      return;
    }

    const data: Receipt = {
      receipt_id: receiptsList.length + 1 + '/' + new Date().getFullYear(),
      name: clientNameRef.current?.value ?? '',
      email: clientEmailRef.current?.value ?? '',
      treatment: treatmentRef.current?.value ?? '',
      price: priceRef.current?.value ?? '',
    };

    // 1.Save array to display and edit if needed, 2.load from the server
    // setReceiptsList((current) => [...current, data]);

    // Send data to aritable and a client
    sendReceipt(data);

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
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <Button className="button is-rounded" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
