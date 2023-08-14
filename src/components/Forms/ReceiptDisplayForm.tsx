import { Button } from '../../ui/Button';
import { useNavigate } from 'react-router';
import './ReceiptDisplayForm.scss';
import { useDataContext } from '../context/DataContext';
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
    <li className="details bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <p className="text-gray-600">{parsedData.fields.receipt_id}</p>
      <p className="text-gray-800 font-medium">{parsedData.fields.name}</p>
      <p className="text-gray-600">{parsedData.fields.email}</p>
      <p className="text-gray-600">{parsedData.fields.treatment}</p>
      <p className="text-gray-800 font-bold">{parsedData.fields.price} kr</p>
      <p className="text-gray-600">{parsedData.fields.date}</p>
      <Button
        label="details"
        onClick={goToDetails}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      />
    </li>
  );
};
