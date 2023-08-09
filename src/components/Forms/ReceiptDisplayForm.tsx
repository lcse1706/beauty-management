import { Button } from '../../stories/Button';
import { useNavigate } from 'react-router';
import './ReceiptDisplayForm.scss';
import { useDataContext } from '../Context/DataContext';
import { z } from 'zod';

type ReceiptDisplayProps = {
  data: {
    id: string;
    fields: {
      receipt_id: string;
      name: string;
      email: string;
      treatment: string;
      price: string;
      date: string;
    };
  };
};

const ReceiptDisplayZOD = z.object({
  id: z.string(),
  fields: z.object({
    receipt_id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    treatment: z.string(),
    price: z.string(),
    date: z.string(),
  }),
});

export const ReceiptDisplayForm = ({ data }: ReceiptDisplayProps) => {
  const navigate = useNavigate();
  const { setReceiptId } = useDataContext();

  const parsedData = ReceiptDisplayZOD.parse(data);

  const goToDetails = () => {
    setReceiptId(parsedData.id);
    navigate(`/receiptlist/${parsedData.id}`);
  };

  return (
    <div className="details">
      <p>{parsedData.fields.receipt_id}</p>
      <p>{parsedData.fields.name}</p>
      <p>{parsedData.fields.email}</p>
      <p>{parsedData.fields.treatment}</p>
      <p>{parsedData.fields.price} kr</p>
      <p>{parsedData.fields.date}</p>
      <Button label="details" onClick={goToDetails} />
    </div>
  );
};
