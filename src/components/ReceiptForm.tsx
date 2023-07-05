import { useRef, useState, useEffect, ChangeEventHandler } from 'react';
import sendReceipt from './sendReceipt';
import Input from './Input';
import Select from './Select';
import './ReceiptForm.scss';
import Button from './Button';

const ReceiptForm = () => {
  const [receiptsList, setReceiptsList] = useState(Array<object>); //useState<Receipt[]>([])

  const clearInputs = () => {
    if (clientNameRef.current && clientEmailRef.current && treatmentRef.current && priceRef.current) {
      clientNameRef.current.value = '';
      clientEmailRef.current.value = '';
      treatmentRef.current.value = '';
      priceRef.current.value = '';
    }
  };

  useEffect(() => {
    // rerender receipt list
    console.dir(receiptsList);
  }, [receiptsList]);

  const clientNameRef = useRef<HTMLInputElement>(null);
  const clientEmailRef = useRef<HTMLInputElement>(null);
  const treatmentRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      name: clientNameRef.current?.value,
      email: clientEmailRef.current?.value,
      treatment: treatmentRef.current?.value,
      price: priceRef.current?.value,
    };

    // 1.Save array to display and edit if needed, 2.load from the server
    setReceiptsList((current) => [...current, data]);

    // Send data to make a form and send it to client
    sendReceipt(data);

    // Reset inputs
    clearInputs();
  };

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  // const handleChange: ChangeEventHandler<HTMLSelectElement> = event => {
  //   setTreatment(event.target.value);
  // };

  return (
    //TODO: Add some validation

    <form className="receiptForm" onSubmit={submitHandler}>
      <Input ref={clientNameRef} label="Client Name:" type="text" />
      <Input ref={clientEmailRef} label="Client Email:" type="email" />
      <Select ref={treatmentRef} label="Treatment:" options={['lashes', 'brows', 'nails']} />
      <Input ref={priceRef} label="Price:" type="number" />
      <Button className="button is-rounded" type="submit">
        Send
      </Button>
    </form>
  );
};

export default ReceiptForm;
