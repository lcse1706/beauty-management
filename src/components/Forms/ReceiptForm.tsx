import { useRef, FormEventHandler } from 'react';
import { Input } from '../../stories/Input';
import { Select } from '../../UI/Select';
import { Button } from '../../stories/Button';
import { useDataContext } from '../Context/DataContext';
import { sendToAirtable } from '../../services/sendToAirtable';
import { Loader } from '../../UI/Loader';
import { useModalContext } from '../Context/ModalContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
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

const ReceiptZOD = z.object({
  fields: z.object({
    receipt_id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    treatment: z.string(),
    price: z.string(),
  }),
});

export const ReceiptForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { receipts, setLoading, loading } = useDataContext();
  const { setShowModal, setMessage } = useModalContext();

  const clearInputs = () => {
    reset({
      name: '',
      email: '',
      treatment: '',
      price: '',
    });
  };

  const inputValidator = (): boolean => {
    if (Object.keys(errors).length > 0) {
      setMessage('Please fill all required fields');
      return true;
    }
    return false;
  };

  // const submitHandler: FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
  const submitHandler: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setMessage('');

    if (inputValidator()) {
      setShowModal(true);
      return;
    }

    const formatedData: Receipt = {
      fields: {
        receipt_id: receipts.length + 1 + '/' + new Date().getFullYear(),
        name: data.name,
        email: data.email,
        treatment: data.treatment,
        price: data.price,
      },
    };

    const parsedData = ReceiptZOD.parse(formatedData);

    const sendData = async () => {
      try {
        setLoading(true);
        await sendToAirtable(parsedData);
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
      <form className="receiptForm" onSubmit={handleSubmit(submitHandler)}>
        <Input label="Client Name:" type="text" register={register('name', { required: true, maxLength: 80 })} />
        {errors.name && <span className="error-message">Please enter a valid name.</span>}
        <Input
          label="Client Email:"
          type="email"
          register={register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span className="error-message">Please enter a valid email address.</span>}
        <Select
          label="Treatment:"
          options={['lashes', 'brows', 'nails']}
          register={register('treatment', { required: true })}
        />
        {errors.treatment && <span className="error-message">Please select a treatment.</span>}
        <Input label="Price:" type="number" register={register('price', { required: true, maxLength: 5 })} />
        {errors.price && <span className="error-message">Please enter a valid price.</span>}
        {loading ? <Loader /> : <Button label="Send" type="submit" />}
      </form>
    </div>
  );
};
