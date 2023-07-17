import './ReceiptDetails.scss';

type Props = {
  data: {
    receipt_id: string;
    name: string;
    email: string;
    threatment: string;
    price: number;
    date: string;
  };
};

export const ReceiptDetails = ({ data }: Props) => {
  return (
    <div className="details">
      <p>{data.receipt_id}</p>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <p>{data.threatment}</p>
      <p>{data.price}</p>
      <p>{data.date}</p>
    </div>
  );
};
