type Props = {
  receipt_id: string;
  name: string;
  email: string;
  threatment: string;
  price: number;
  date: string;
};

const ReceiptDetails = ({ receipt_id, name, email, threatment, price, date }: Props) => {
  return (
    <div>
      <p>{receipt_id}</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{threatment}</p>
      <p>{price}</p>
      <p>{date}</p>
    </div>
  );
};

export default ReceiptDetails;
