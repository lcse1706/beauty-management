import { Button } from '../../UI/Button';
import { useNavigate } from 'react-router';
import './ReceiptDisplayForm.scss';
import { useDataContext } from '../Context/DataContext';

type Props = {
  data: {
    id: string;
    fields: {
      receipt_id: string;
      name: string;
      email: string;
      threatment: string;
      price: number;
      date: string;
    };
  };
};

export const ReceiptDisplayForm = ({ data }: Props) => {
  const navigate = useNavigate();
  const { setReceiptId } = useDataContext();

  const goToDetails = () => {
    setReceiptId(data.id);
    navigate(`/receiptlist/${data.id}`);
  };

  return (
    <div className="details">
      <p>{data.fields.receipt_id}</p>
      <p>{data.fields.name}</p>
      <p>{data.fields.email}</p>
      <p>{data.fields.threatment}</p>
      <p>{data.fields.price}</p>
      <p>{data.fields.date}</p>
      <Button type="button" onClick={goToDetails}>
        details
      </Button>
    </div>
  );
};
