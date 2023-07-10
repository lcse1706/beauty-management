type Props = {
  name: string;
  email: string;
};

const ReceiptDetails = ({ name, email }: Props) => {
  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
};

export default ReceiptDetails;
