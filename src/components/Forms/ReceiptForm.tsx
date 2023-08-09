import { useRef, FormEventHandler } from 'react';
import { Input } from '../../stories/Input';
import { Select } from '../../stories/Select';
import { Button } from '../../stories/Button';
import { useDataContext } from '../Context/DataContext';
import { sendToAirtable } from '../../services/sendToAirtable';
import { Loader } from '../../UI/Loader';
import { usePopupContext } from '../Context/PopupContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import './ReceiptForm.scss';
import { fetchReceipts } from '../../services/fetchReceipts';
import { ReceiptList } from './ReceiptList';

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
  const { receipts, setReceipts, setLoading, loading } = useDataContext();
  const { setShowPopup, setMessage } = usePopupContext();

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
      setShowPopup(true);
      return;
    }

    let formatedData;

    if (receipts.length !== 0) {
      const sortedReceipts = [...receipts].sort(
        (a, b) => parseInt(a.fields.receipt_id) - parseInt(b.fields.receipt_id)
      );
      let getLastNumber = sortedReceipts[sortedReceipts.length - 1].fields.receipt_id.split('/')[0];
      const getMonthNumber = sortedReceipts[sortedReceipts.length - 1].fields.receipt_id.split('/')[1];
      console.log(getLastNumber);
      console.log(getMonthNumber);

      if (+getMonthNumber === new Date().getMonth() + 1) {
        getLastNumber = '0';
      }

      formatedData = {
        fields: {
          receipt_id: +getLastNumber + 1 + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
          name: data.name,
          email: data.email,
          treatment: data.treatment,
          price: data.price,
        },
      };
    } else {
      formatedData = {
        fields: {
          receipt_id: '1/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
          name: data.name,
          email: data.email,
          treatment: data.treatment,
          price: data.price,
        },
      };
    }

    const parsedData = ReceiptZOD.parse(formatedData);

    const sendData = async () => {
      try {
        setLoading(true);
        await sendToAirtable(parsedData);
        setMessage('Receipt successfully added !');
        const data = await fetchReceipts();
        setReceipts(data);
        console.log('Receipt Lists updated.');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setShowPopup(true);
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
