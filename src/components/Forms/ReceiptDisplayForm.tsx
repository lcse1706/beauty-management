import { Button } from '../ui';
import { useNavigate } from 'react-router';
import { useDataContext } from '../../context/DataContext';
import './ReceiptDisplayForm.scss';

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

export const ReceiptDisplayForm = ({ data }: ReceiptDisplayProps) => {
  const navigate = useNavigate();
  const { setReceiptId } = useDataContext();

  const goToDetails = () => {
    setReceiptId(data.id);
    navigate(`/receiptlist/${data.id}`);
  };

  return (
    <li className="details bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <p className="text-gray-600">{data.fields.receipt_id}</p>
      <p className="text-gray-800 font-medium">{data.fields.name}</p>
      <p className="text-gray-600">{data.fields.email}</p>
      <p className="text-gray-600">{data.fields.treatment}</p>
      <p className="text-gray-800 font-bold">{data.fields.price} kr</p>
      <p className="text-gray-600">{data.fields.date}</p>
      <Button
        label="details"
        onClick={goToDetails}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      />
    </li>
  );
};
