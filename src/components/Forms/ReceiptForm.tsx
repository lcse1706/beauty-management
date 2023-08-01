import { useRef, FormEventHandler } from 'react';
import { Input } from '../../UI/Input';
import { Select } from '../../UI/Select';
import { Button } from '../../UI/Button';
import { useDataContext } from '../Context/DataContext';
import { sendToAirtable } from '../../services/sendToAirtable';
import { Loader } from '../../UI/Loader';
import { useModalContext } from '../Context/ModalContext';
import { useForm } from 'react-hook-form';
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
  const submitHandler: any = (data: any) => {
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

    const sendData = async () => {
      try {
        setLoading(true);
        await sendToAirtable(formatedData);
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

    console.log(formatedData);
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
